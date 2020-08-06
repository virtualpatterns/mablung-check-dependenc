import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import JSON5 from 'json5'
import Match from 'minimatch'
import Path from 'path'
import Query from 'jsonpath'

export async function Babel(path) {
  // console.log(`Babel('${Path.relative('', path)}') { ... }`)

  let dependency = []

  let fileName = Path.basename(path)

  let pattern = [ 'package.json', 'babel.config.json', '.babelrc.json' ]

  if (pattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(fileName, pattern, { 'dot': true }), false)) {

    let configuration = null
    configuration = JSON5.parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }))
    configuration = fileName === 'package.json' ? (configuration.babel || {}) : configuration

    let plugin = null
    plugin = Query.query(configuration, '$..plugins[*]')
    plugin = plugin.filter((plugin) => Is.array(plugin) || plugin !== 'importMeta')
    plugin = plugin.map((plugin) => Is.array(plugin) ? plugin[0] : plugin)

    let preset = null
    preset = Query.query(configuration, '$..presets[*]')
    preset = preset.map((preset) => Is.array(preset) ? preset[0] : preset)

    dependency = [ ...plugin, ...preset ]

  }

  return dependency

}