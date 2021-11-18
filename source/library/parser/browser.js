import FileSystem from 'fs-extra'

import { GetPackageName } from '../get-package-name.js'

export async function Browser(path) {

  let configuration = null
  configuration = await FileSystem.readJson(path, { 'encoding': 'utf-8' })
  configuration = configuration.browser || {}

  let _package = Object
    .entries(configuration)
    .map(([ , value ]) => GetPackageName(value))

  return _package

}
