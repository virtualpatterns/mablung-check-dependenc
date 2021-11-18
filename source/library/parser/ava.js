import { createRequire as CreateRequire } from 'module'
import JSON from 'jsonpath'
import Path from 'path'

import { GetPackageName } from '../get-package-name.js'

const Require = CreateRequire(import.meta.url)

export async function Ava(path) {
  
  let configuration = Require(path)({ 'path': Path.dirname(path) })

  let _package = JSON
    .query(configuration, '$.require[*]')
    .map((_package) => GetPackageName(_package))

  return _package

}
