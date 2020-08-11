import FileSystem from 'fs-extra'
import JSON5 from 'json5'
import Match from 'minimatch'
import Path from 'path'
import Query from 'jsonpath'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Ava(path) {
  // console.log(`Ava('${Path.relative('', path)}') { ... }`)

  let dependency = []

  let fileName = Path.basename(path)
  let pattern = [ 'package.json', 'ava.config.json' ]

  if (pattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(fileName, pattern, { 'dot': true }), false)) {

    let configuration = null
    configuration = JSON5.parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }))
    configuration = fileName === 'package.json' ? (configuration.ava || {}) : configuration

    let require = Query.query(configuration, '$.require[*]')

    dependency = require.map((dependency) => GetDependencyName(dependency))

  }

  return dependency

}