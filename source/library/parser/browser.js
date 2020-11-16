import FileSystem from 'fs-extra'
import JSON5 from 'json5'
// import Path from 'path'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Browser(filePath) {
  // console.log(`Browser('${Path.relative('', filePath)}') { ... }`)

  let configuration = null
  configuration = JSON5.parse(await FileSystem.readFile(filePath, { 'encoding': 'utf-8' }))
  configuration = configuration.browser || {}

  let fileDependency = Object.entries(configuration)
    .map(([, value]) => GetDependencyName(value))

  return fileDependency

}
