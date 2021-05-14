import FileSystem from 'fs-extra';
import JSON5 from 'json5';
import Match from 'minimatch';
import Path from 'path';
import Query from 'jsonpath';

import { GetDependencyName } from '../get-dependency-name.js';

export async function Ava(filePath) {
  // console.log(`Ava('${Path.relative('', filePath)}') { ... }`)

  let fileDependency = [];

  let fileName = Path.basename(filePath);
  let pattern = ['package.json', 'ava.config.json'];

  if (pattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(fileName, pattern, { 'dot': true }), false)) {

    let configuration = null;
    configuration = JSON5.parse(await FileSystem.readFile(filePath, { 'encoding': 'utf-8' }));
    configuration = fileName === 'package.json' ? configuration.ava || {} : configuration;

    let require = Query.query(configuration, '$.require[*]');

    fileDependency = require.map((dependency) => GetDependencyName(dependency));

  }

  return fileDependency;

}

//# sourceMappingURL=ava.js.map