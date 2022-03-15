import FileSystem from 'fs-extra'
import JsonParse from 'json5'

import { GetPackageName } from '../get-package-name.js'

export async function Browser(path) {

  let configuration = null
  configuration = JsonParse.parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }))
  configuration = configuration.browser || {}

  let _package = Object.entries(configuration)
    .map(([ , value ]) => GetPackageName(value))

  return _package

}
