import FileSystem from 'fs-extra';
import Parse from '@kba/makefile-parser';
import Query from 'jsonpath';

import { GetDependencyBinary } from '../get-dependency-binary.js';

const Process = process;

export async function Make(filePath, packageDependency, packagePath) {
  // console.log(`Make('${Path.relative('', filePath)}', packageDependency, '${Path.relative('', packagePath)}') { ... }`)
  // console.dir(packageDependency)
  // console.log(`Process.env['MAKEFILE_PATH'] = ${Process.env['MAKEFILE_PATH']}`)

  let fileDependency = [];
  let makefilePath = Process.env['MAKEFILE_PATH'];

  if (makefilePath) {

    makefilePath = makefilePath.
    split(' ');

    if (makefilePath.includes(filePath)) {

      let dependencyBinary = await GetDependencyBinary(packageDependency, (await FileSystem.pathExists(`${packagePath}/node_modules`)) ? `${packagePath}/node_modules` : packagePath);

      for (let path of makefilePath) {

        let { ast } = Parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }), { 'unhandled': true });
        let recipe = Query.query(ast, '$..recipe[*]');

        fileDependency = fileDependency.
        concat(

        dependencyBinary.
        filter((binary) => {

          /*
            binaryPattern includes ...
            abc
            @bcd
            -cde
            @-def
            -@efg
            fgh X
            @-X ghi
            -@X hij X
            $(abc)/ijk
             jkl
            klm 
            $(lmn)
          */

          let binaryPattern = new RegExp(`^[@\\-/]{0,2}${binary.binaryName}$|^[@\\-/]{0,2}${binary.binaryName}\\s+.*$|.*[\\s/]+${binary.binaryName}\\s+.*|.*[\\s/]+${binary.binaryName}$|\\$\\(${binary.binaryName}\\)`, 'm');
          return recipe.
          filter((recipe) => binaryPattern.test(recipe)).
          length > 0;

        }).
        map((binary) => binary.packageName));



        fileDependency = fileDependency.
        concat(packageDependency.filter((dependency) => path.indexOf(`node_modules/${dependency}`) !== -1));

      }

      fileDependency = fileDependency.
      filter((dependency, index, fileDependency) => fileDependency.indexOf(dependency) === index);

    }

  }

  return fileDependency;

}

//# sourceMappingURL=make.js.map