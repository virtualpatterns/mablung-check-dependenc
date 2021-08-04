import FileSystem from 'fs-extra'
// import Path from 'path'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Browser(filePath) {
  // console.log(`Browser('${Path.relative('', filePath)}') { ... }`)

  let configuration = null
  configuration = await FileSystem.readJson(filePath, { 'encoding': 'utf-8' })
  configuration = configuration.browser || {}

  let fileDependency = Object.entries(configuration)
    .map(([, value]) => GetDependencyName(value))

  return fileDependency

}
