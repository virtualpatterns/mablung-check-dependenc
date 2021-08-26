import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import JSON from 'jsonpath'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Babel(path) {

  let configuration = await FileSystem.readJson(path, { 'encoding': 'utf-8' })

  let plugin = null
  plugin = JSON.query(configuration, '$..plugins[*]')
  plugin = plugin.map((plugin) => Is.array(plugin) ? plugin[0] : plugin)
  plugin = plugin.filter((plugin) => Is.not.equal(plugin, 'importMeta'))
  plugin = plugin.map((plugin) => GetDependencyName(plugin))

  let preset = null
  preset = JSON.query(configuration, '$..presets[*]')
  preset = preset.map((preset) => Is.array(preset) ? preset[0] : preset)
  preset = preset.map((preset) => GetDependencyName(preset))

  return [ ...plugin, ...preset ]

}