import FileSystem from 'fs-extra'
import JSON5 from 'json5'
// import Path from 'path'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Browser(filePath, packageDependency) {
  // console.log(`Browser('${Path.relative('', filePath)}', packageDependency) { ... }`)
  // console.dir(packageDependency)

  let configuration = null
  configuration = JSON5.parse(await FileSystem.readFile(filePath, { 'encoding': 'utf-8' }))
  configuration = configuration.browser || {}

  let fileDependency = Object.entries(configuration)
    .map(([, value]) => GetDependencyName(value))

  // let fileDependency = (packageDependency.length <= 0 ? name : packageDependency).filter((dependency) => name.includes(dependency))

  return fileDependency

}
