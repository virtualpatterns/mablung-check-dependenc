import FileSystem from 'fs-extra';
import Is from '@pwn/is';
import Match from 'minimatch';
import Parse from '@kba/makefile-parser';
import Path from 'path';
import Query from 'jsonpath';

import { GetDependencyBinary } from '../get-dependency-binary.js';

const Process = process;

export async function Make(filePath, packageDependency, packagePath) {
  // console.log(`Make('${Path.relative('', filePath)}', packageDependency, '${Path.relative('', packagePath)}') { ... }`)
  // console.dir(packageDependency)

  let fileDependency = [];

  let fileName = Path.basename(filePath);
  let filePattern = null;

  if (Is.not.undefined(Process.env['MAKEFILE_LIST'])) {

    filePattern = Process.env['MAKEFILE_LIST'].
    split(' ').
    map((path) => Path.basename(path));

  } else {
    filePattern = ['Makefile', 'makefile'];
  }

  if (filePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(fileName, pattern), false)) {

    let dependencyBinary = await GetDependencyBinary(packageDependency, (await FileSystem.pathExists(`${packagePath}/node_modules`)) ? `${packagePath}/node_modules` : packagePath);

    /*
      Assumming shx is the binary, supports ...
      shx
      @shx
      -shx
      @-shx
      -@shx
      shx X
      @-X shx
      -@X shx X
    */

    let { ast: fileAst } = Parse(await FileSystem.readFile(filePath, { 'encoding': 'utf-8' }));
    let fileRecipe = Query.query(fileAst, '$..recipe[*]');

    fileDependency = dependencyBinary.
    filter((binary) => {
      let binaryPattern = new RegExp(`^[@|-]{0,2}${binary.binaryName}$|^[@|-]{0,2}${binary.binaryName}\\s+.*$|.*\\s+${binary.binaryName}\\s+.*|.*\\s+${binary.binaryName}$`, 'm');
      return fileRecipe.
      filter((recipe) => binaryPattern.test(recipe)).
      length > 0;
    }).
    map((binary) => binary.packageName).
    filter((dependency, index, fileDependency) => fileDependency.indexOf(dependency) === index);

  }

  return fileDependency;

}

//# sourceMappingURL=make.js.map