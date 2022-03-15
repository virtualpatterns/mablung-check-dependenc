import Is from '@pwn/is'
import Json from 'jsonpath'

import { GetPackageName } from '../get-package-name.js'

export async function Ava(filePath, allPackage, projectPath) {
  
  let configuration = await import(filePath)
    .then((module) => module.default)

  if (Is.function(configuration)) {
    configuration = await configuration({ 'projectDir': projectPath })
  }
  
  let usedPackage = Json
    .query(configuration, '$.require[*]')
    .map((_package) => GetPackageName(_package))

  return usedPackage

}
