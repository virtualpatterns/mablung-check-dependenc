import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import JsonParse from 'json5'
import JsonQuery from 'jsonpath'

import { GetPackageName } from '../get-package-name.js'

export async function Babel(path) {

  let configuration = JsonParse.parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }))

  let plugin = JsonQuery.query(configuration, '$..plugins[*]')
    .map((plugin) => Is.array(plugin) ? plugin[0] : plugin)
    .filter((plugin) => Is.not.equal(plugin, 'importMeta'))
    .map((plugin) => GetPackageName(plugin))

  let preset = JsonQuery.query(configuration, '$..presets[*]')
    .map((preset) => Is.array(preset) ? preset[0] : preset)
    .map((preset) => GetPackageName(preset))

  return [ ...plugin, ...preset ]

}