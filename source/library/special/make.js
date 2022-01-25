import FileSystem from 'fs-extra'
import Parse from '@kba/makefile-parser'
import JSON from 'jsonpath'

import { GetProjectBinary } from '../get-project-binary.js'

const Process = process

export async function Make(path, packageDependency, projectPath) {
  
  let _package = []
  let makefilePath = (Process.env.MAKEFILE_PATH || '').split(' ')

  if (makefilePath.includes(path)) {

    let { ast } = Parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }), { 'unhandled': true })

    let value = JSON.query(ast, '$..export.value')
    let recipe = JSON.query(ast, '$..recipe[*]')

    let binary = (await GetProjectBinary(projectPath)).flat(Infinity)

    _package = _package
      .concat(

        binary
          .filter((binary) =>
            value
              .filter((value) => binary.binary.pattern.test(value))
              .length > 0 ||
            recipe
              .filter((recipe) => binary.binary.pattern.test(recipe))
              .length > 0)
          .map((binary) => binary.package.name)

      ) 

  }

  return _package

}