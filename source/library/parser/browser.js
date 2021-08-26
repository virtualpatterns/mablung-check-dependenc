import FileSystem from 'fs-extra'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Browser(path) {

  let configuration = null
  configuration = await FileSystem.readJson(path, { 'encoding': 'utf-8' })
  configuration = configuration.browser || {}

  let dependency = Object.entries(configuration)
    .map(([ , value ]) => GetDependencyName(value))

  return dependency

}
