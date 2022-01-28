import Is from '@pwn/is'
import JSON from 'jsonpath'

import { GetPackageName } from '../get-package-name.js'

export async function Ava(filePath, allPackage, projectPath) {
  
  let configuration = await import(filePath)
    .then((module) => module.default)

  if (Is.function(configuration)) {
    configuration = await configuration({ 'projectDir': projectPath })
  }
  
  let usedPackage = JSON
    .query(configuration, '$.require[*]')
    .map((_package) => GetPackageName(_package))

  return usedPackage

}
