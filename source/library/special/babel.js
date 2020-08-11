import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import JSON5 from 'json5'
import Match from 'minimatch'
import Path from 'path'
import Query from 'jsonpath'

import { GetDependencyName } from './get-dependency-name.js'

export async function Babel(filePath, packageDependency) {
  // console.log(`Babel('${Path.relative('', filePath)}', packageDependency) { ... }`)
  // console.dir(packageDependency)

  let fileDependency = []

  let fileName = Path.basename(filePath)
  let pattern = [ 'package.json', 'babel.config.json', '.babelrc.json' ]

  if (pattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(fileName, pattern, { 'dot': true }), false)) {

    let configuration = null
    configuration = JSON5.parse(await FileSystem.readFile(filePath, { 'encoding': 'utf-8' }))
    configuration = fileName === 'package.json' ? (configuration.babel || {}) : configuration

    let plugin = null
    plugin = Query.query(configuration, '$..plugins[*]')
    plugin = plugin.filter((plugin) => Is.array(plugin) || plugin !== 'importMeta')
    plugin = plugin.map((plugin) => Is.array(plugin) ? plugin[0] : plugin)
    plugin = plugin.map((plugin) => GetDependencyName(plugin))

    let preset = null
    preset = Query.query(configuration, '$..presets[*]')
    preset = preset.map((preset) => Is.array(preset) ? preset[0] : preset)
    preset = preset.map((preset) => GetDependencyName(preset))

    fileDependency = (packageDependency.length <= 0 ? [ ...plugin, ...preset ] : packageDependency).filter((packageDependency) => [ ...plugin, ...preset ].filter((name) => packageDependency.endsWith(name)).length > 0)

  }

  return fileDependency

}