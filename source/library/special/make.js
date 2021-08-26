import FileSystem from 'fs-extra'
import Parse from '@kba/makefile-parser'
import JSON from 'jsonpath'

import { GetPackageBinary } from '../get-package-binary.js'

const Process = process

export async function Make(path, packageDependency, packagePath) {
  
  let dependency = []

  let makefilePath = null
  makefilePath = Process.env?.MAKEFILE_PATH || ''
  makefilePath = makefilePath.split(' ')

  if (makefilePath.includes(path)) {

    let binary = null
    binary = await GetPackageBinary(`${packagePath}/node_modules`)
    binary = binary
      // .filter((binary) => packageDependency.includes(binary.name))
      .map((binary) => {

        /*
          pattern includes ...
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

        binary.pattern = new RegExp(`^[@\\-/]{0,2}${binary.binary}$|^[@\\-/]{0,2}${binary.binary}\\s+.*$|.*[\\s/]+${binary.binary}\\s+.*|.*[\\s/]+${binary.binary}$|\\$\\(${binary.binary}\\)`, 'm')

        return binary

      })

    let { ast } = Parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }), { 'unhandled': true })
    let recipe = JSON.query(ast, '$..recipe[*]')

    dependency = dependency.concat(

      binary
        .filter((binary) => recipe
          .filter((recipe) => binary.pattern.test(recipe))
          .length > 0)
        .map((binary) => binary.name)

    )

  }

  return dependency

}