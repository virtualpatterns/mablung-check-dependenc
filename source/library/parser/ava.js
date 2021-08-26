import { createRequire as CreateRequire } from 'module'
import JSON from 'jsonpath'
import Path from 'path'

import { GetDependencyName } from '../get-dependency-name.js'

const Require = CreateRequire(import.meta.url)

export async function Ava(path) {
  
  let configuration = Require(path)({ 'path': Path.dirname(path) })

  let require = null
  require = JSON.query(configuration, '$.require[*]')
  require = require.map((dependency) => GetDependencyName(dependency))

  return require

}
