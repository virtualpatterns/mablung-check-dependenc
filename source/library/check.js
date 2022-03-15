import { transform as Transform } from 'node-json-transform'
import BaseCheck from 'depcheck'
import Is from '@pwn/is'
import Merge from 'deepmerge'
import Path from 'path'

import { GetPackage } from './get-package.js'

import { Ava } from './parser/ava.js'
import { Babel } from './parser/babel.js'
import { Browser } from './parser/browser.js'
import { Make } from './special/make.js'
import { Pug } from './parser/pug.js'

import { FileParseError } from './error/file-parse-error.js'
import { FolderParseError } from './error/folder-parse-error.js'

const Process = process

export function Check(userPath = Process.cwd(), userOption = {}) {

  return new Promise((resolve, reject) => {

    try {

      const Package = GetPackage(userPath)

      let defaultOption = {
        'ignoreMatch': Package.name ? [ Package.name ] : [],
        'parser': {
          '**/*.cjs': BaseCheck.parser.es7.default,
          '**/*.js': BaseCheck.parser.es7.default,
          '**/*.pug': Pug,
          '**/.babelrc.json': Babel,
          '**/ava.config.js': Ava,
          '**/babel.config.json': Babel,
          '**/package.json': Browser
        },
        'special': [
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
  
      let projectPath = Path.resolve(userPath)
      let option = Transform(Merge(defaultOption, userOption), map)

      BaseCheck(projectPath, option, (unused) => {

        switch (true) {
          case Is.not.emptyObject(unused.invalidDirs): {

            let item = Object.entries(unused.invalidDirs)

            let path = item[0][0]
            let error = item[0][1]

            reject(new FolderParseError(path, error))

            break

          }
          case Is.not.emptyObject(unused.invalidFiles): {

            let item = Object.entries(unused.invalidFiles)

            let path = item[0][0]
            let error = item[0][1]

            reject(new FileParseError(path, error))

            break

          }
          default:
  
            resolve({
              'section': Object.entries(unused.using)
                .filter(([ dependency ]) => !option.ignoreMatches.includes(dependency))
                .reduce((accumulator, [ dependency, path ]) => {

                  let actualCategory = null

                  switch (true) {
                    case Object.entries(Package.dependencies || {}).filter(([ packageDependency ]) => Is.equal(packageDependency, dependency)).length > 0:
                      actualCategory = 'dependencies'
                      break
                    case Object.entries(Package.devDependencies || {}).filter(([ packageDependency ]) => Is.equal(packageDependency, dependency)).length > 0:
                      actualCategory = 'devDependencies'
                      break
                    default:
                      actualCategory = null
                  }

                  let expectedCategory = path.reduce((accumulator, fullPath) => {

                    let relativePath = Path.relative(projectPath, fullPath)

                    switch (true) {
                      case /\/sandbox\/.*?\.c?js/i.test(relativePath) ||
                           /\/test\/.*?\.c?js/i.test(relativePath):
                        return Is.equal(accumulator, 'dependencies') ? accumulator : 'devDependencies'
                      case /source\/.*?\.c?js/i.test(relativePath):
                        return 'dependencies'
                      default:
                        return 'devDependencies'
                    }

                  }, 'devDependencies')
                
                  if (Is.not.equal(expectedCategory, actualCategory)) {
                    accumulator[dependency] = {
                      'actual': actualCategory,
                      'expected': expectedCategory
                    }
                  }

                  return accumulator

                }, {}),
              'missing': unused.missing,
              'unused': [ ...unused.dependencies, ...unused.devDependencies ],
              'used': unused.using
            })

        }
  
      })

    } catch(error) {
      reject(error)
    }

  })

}