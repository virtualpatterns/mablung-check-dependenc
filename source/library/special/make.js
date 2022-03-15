import FileSystem from 'fs-extra'
import Parse from '@kba/makefile-parser'
import Json from 'jsonpath'

import { GetProjectBinary } from '../get-project-binary.js'

const Process = process

export async function Make(filePath, allPackage, projectPath) {
  
  let usedPackage = []
  let makefilePath = (Process.env.MAKEFILE_PATH || '').split(' ')

  if (makefilePath.includes(filePath)) {

    let { ast } = Parse(await FileSystem.readFile(filePath, { 'encoding': 'utf-8' }), { 'unhandled': true })

    let value = Json.query(ast, '$..export.value')
    let recipe = Json.query(ast, '$..recipe[*]')

    let binary = (await GetProjectBinary(projectPath)).flat(Infinity)

    usedPackage = usedPackage
      .concat(

        allPackage
          .filter((onePackage) => makefilePath
            .filter((makefilePath) => makefilePath.includes(onePackage))
            .length > 0)
        
      )
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

  return usedPackage

}