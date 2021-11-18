import FileSystem from 'fs-extra'
import Parse from '@kba/makefile-parser'
import JSON from 'jsonpath'

import { GetBinary } from '../get-binary.js'

const Process = process

export async function Make(path, packageDependency, packagePath) {
  
  let _package = []
  let makefilePath = (Process.env?.MAKEFILE_PATH || '')
    .split(' ')

  if (makefilePath.includes(path)) {

    let { ast } = Parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }), { 'unhandled': true })

    let value = JSON.query(ast, '$..export.value')
    let recipe = JSON.query(ast, '$..recipe[*]')

    let binary = await GetBinary(`${packagePath}/node_modules`)

    _package = _package
      .concat(

        binary
          .filter((binary) =>
            value
              .filter((value) => binary.binaryPattern.test(value))
              .length > 0 ||
            recipe
              .filter((recipe) => binary.binaryPattern.test(recipe))
              .length > 0)
          .map((binary) => binary.packageName)

      ) 

  }

  return _package

}