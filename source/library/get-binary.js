import FileSystem from 'fs-extra'
import Find from 'find'
import Is from '@pwn/is'

import { GetBinaryName } from './get-binary-name.js'

const Process = process

export async function GetBinary(rootPath = `${Process.cwd()}/node_modules`) {

  let binary = []
  let packagePath = Find.fileSync(/package\.json$/, rootPath)

  for (let item of packagePath) {

    let { name: packageName, bin: packageBinary } = await FileSystem.readJson(item, { 'encoding': 'utf-8' })

    if (Is.not.nil(packageBinary)) {

      if (Is.string(packageBinary)) {
        binary.push({ packageName, 'binaryName': GetBinaryName(packageName), 'binaryPattern': new RegExp(`(?:\\s|\\(|/)${GetBinaryName(packageName)}(?:\\)|\\s|$)`, 'm') })
      } else {
        for (let item in packageBinary) {
          binary.push({ packageName, 'binaryName': item, 'binaryPattern': new RegExp(`(?:\\s|\\(|/)${item}(?:\\)|\\s|$)`, 'm') })
        }
      }

    }

  }

  return binary
  
}
