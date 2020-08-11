import FileSystem from 'fs-extra'
import Query from 'jsonpath'
import Path from 'path'

import Lex from 'pug-lexer'
import Link from 'pug-linker'
import Load from 'pug-load'
import Parse from 'pug-parser'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Pug(filePath, packageDependency) {
  // console.log(`Pug('${Path.relative('', filePath)}', packageDependency) { ... }`)
  // console.dir(packageDependency)

  let fileDependency = []
  let content = await FileSystem.readFile(filePath, { 'encoding': 'utf-8' })

  let lexerOutput = Lex(content, { 'filename': filePath })
  let parserOutput = Parse(lexerOutput, { 'filename': filePath })
  let loaderOutput = Load(parserOutput, { 'lex': Lex, 'parse': Parse })
  let AST = Link(loaderOutput)

  let node = Query.query(AST, '$..*[?(@.type==\'Filter\')]')
  let name = node.map((node) => GetDependencyName(node.name))

  fileDependency = (packageDependency.length <= 0 ? name : packageDependency).filter((packageDependency) => name.filter((name) => packageDependency.endsWith(name)).length > 0)

  return fileDependency

}