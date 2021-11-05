import BaseCheck from 'depcheck'
import BaseTransform from 'node-json-transform'
import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import Merge from 'deepmerge'
import Path from 'path'

import { Ava } from './parser/ava.js'
import { Babel } from './parser/babel.js'
import { Browser } from './parser/browser.js'
import { Make } from './special/make.js'
// import { Parcel } from './parser/parcel.js'
import { Pug } from './parser/pug.js'

import { FileParseError } from './error/file-parse-error.js'
import { FolderParseError } from './error/folder-parse-error.js'

const { transform: Transform } = BaseTransform

const Process = process

export function Check(userPath = Process.cwd(), userOption = {}) {

  return new Promise((resolve, reject) => {

    try {

      const Package = FileSystem.readJsonSync(`${userPath}/package.json`, { 'encoding': 'utf-8' })

      let defaultOption = {
        'ignoreMatch': Package.name ? [ Package.name ] : [],
        'parser': {
          '**/*.cjs': BaseCheck.parser.es7.default, // [ BaseCheck.parser.es6, BaseCheck.parser.es7.default ],
          '**/*.js': BaseCheck.parser.es7.default, // [ BaseCheck.parser.es6, BaseCheck.parser.es7.default ],
          '**/*.pug': Pug,
          '**/.babelrc.json': Babel,
          '**/ava.config.cjs': Ava,
          '**/babel.config.json': Babel,
          '**/package.json': Browser // [ Browser, Parcel ]
        },
        'special': [
          // BaseCheck.special.babel,
          BaseCheck.special.bin,
          BaseCheck.special.eslint,
          Make
        ]
      }

      let map = {
        'item': {
          'ignoreMatches': 'ignoreMatch',
          'ignorePatterns': 'ignorePattern',
          'package': {
            'dependencies': 'package.dependency',
            'devDependencies': 'package.devDependency',
            'peerDependencies': 'package.peerDependency',
            'optionalDependencies': 'package.optionalDependency'
          },
          'parsers': 'parser',
          'specials': 'special'
        },
        'each': (item) => {
          if (Is.emptyObject(item.package)) {
            delete item.package
          }
          return item
        }
      }
  
      let path = Path.resolve(userPath)
      let option = Transform(Merge(defaultOption, userOption), map)

      BaseCheck(path, option, (unused) => {
        
        // console.dir(unused.using)

        if (Is.emptyObject(unused.invalidFiles) && 
            Is.emptyObject(unused.invalidDirs)) {
  
          resolve({
            'missing': unused.missing,
            'unused': [ ...unused.dependencies, ...unused.devDependencies ],
            'used': unused.using
          })
  
        } else {
  
          if (Is.emptyObject(unused.invalidDirs)) {

            let item = Object.entries(unused.invalidFiles)

            let path = item[0][0]
            let error = item[0][1]

            reject(new FileParseError(path, error))

          /* c8 ignore next 10 */
          } else {

            let item = Object.entries(unused.invalidDirs)

            let path = item[0][0]
            let error = item[0][1]

            reject(new FolderParseError(path, error))

          }
  
        }
  
      })

    } catch(error) {
      reject(error)
    }

  })

}