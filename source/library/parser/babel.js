import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import JSON from 'jsonpath'

import { GetPackageName } from '../get-package-name.js'

export async function Babel(path) {

  let configuration = await FileSystem.readJson(path, { 'encoding': 'utf-8' })

  let plugin = JSON
    .query(configuration, '$..plugins[*]')
    .map((plugin) => Is.array(plugin) ? plugin[0] : plugin)
    .filter((plugin) => Is.not.equal(plugin, 'importMeta'))
    .map((plugin) => GetPackageName(plugin))

  let preset = JSON
    .query(configuration, '$..presets[*]')
    .map((preset) => Is.array(preset) ? preset[0] : preset)
    .map((preset) => GetPackageName(preset))

  return [ ...plugin, ...preset ]

}