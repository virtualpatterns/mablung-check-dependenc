import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import Path from 'path'

import { GetBinaryName } from './get-binary-name.js'

export async function GetBinary(packagePath = Path.resolve('package.json')) {

  let { 'bin': binary, 'name': packageName } = await FileSystem.readJson(packagePath, { 'encoding': 'utf-8' })
  let value = null

  switch (true) {
    case Is.string(binary):
      value = [ {
        'binary': {
          'name': GetBinaryName(packageName),
          'path': Path.resolve(Path.dirname(packagePath), binary),
          'pattern': new RegExp(`(?:\\s|\\(|/)${GetBinaryName(packageName)}(?:\\)|\\s|$)`, 'm')
        },
        'package': {
          'name': packageName,
          'path': packagePath
        }
      } ]
      break
    default:
      value = Object.entries(binary || {})
        .map(([binaryName, binaryPath]) => ({
          'binary': {
            'name': GetBinaryName(binaryName),
            'path': Path.resolve(Path.dirname(packagePath), binaryPath),
            'pattern': new RegExp(`(?:\\s|\\(|/)${GetBinaryName(binaryName)}(?:\\)|\\s|$)`, 'm')
          },
          'package': {
            'name': packageName,
            'path': packagePath
          }
        }))
  }

  return value

}
