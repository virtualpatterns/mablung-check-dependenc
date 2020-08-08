import BaseCheck from 'depcheck';
import Is from '@pwn/is';
import Merge from 'deepmerge';
import Transform from 'node-json-transform';

import { Ava } from './special/ava.js';
import { Babel } from './special/babel.js';

const Process = process;

export function Check(userPath = Process.cwd(), userOption = {}) {

  return new Promise((resolve, reject) => {

    try {

      let path = userPath;

      let defaultOption = {
        'ignorePattern': [
        'distributable'],

        'parser': {
          '*.js': BaseCheck.parser.es6,
          '*.cjs': BaseCheck.parser.es6 },

        'special': [
        BaseCheck.special.bin,
        BaseCheck.special.eslint,
        Ava,
        Babel] };



      let map = {
        'item': {
          'ignoreMatches': 'ignoreMatch',
          'ignorePatterns': 'ignorePattern',
          'package': {
            'dependencies': 'package.dependency',
            'devDependencies': 'package.devDependency',
            'peerDependencies': 'package.peerDependency',
            'optionalDependencies': 'package.optionalDependency' },

          'parsers': 'parser',
          'specials': 'special' },

        'each': item => {
          if (Is.emptyObject(item.package)) {
            delete item.package;
          }
          return item;
        } };


      let option = Transform.transform(Merge(defaultOption, userOption), map);

      BaseCheck(path, option, unused => {

        if (Is.emptyObject(unused.invalidFiles) &&
        Is.emptyObject(unused.invalidDirs)) {

          resolve({
            'unused': [...unused.dependencies, ...unused.devDependencies],
            'missing': unused.missing });


        } else {

          if (Is.emptyObject(unused.invalidDirs)) {
            let fileError = Object.entries(unused.invalidFiles);
            reject(fileError[0][1]);
          } else {
            let folderError = Object.entries(unused.invalidDirs);
            reject(folderError[0][1]);
          }

        }

      });
    } catch (error) {
      reject(error);
    }

  });

}
//# sourceMappingURL=check.js.map