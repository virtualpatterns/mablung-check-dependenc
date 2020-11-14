import FileSystem from 'fs-extra'
// import Path from 'path'
import Query from 'jsonpath'

import Lex from 'pug-lexer'
// import Link from 'pug-linker'
import Load from 'pug-load'
import Parse from 'pug-parser'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Pug(filePath, packageDependency) {
  // console.log(`Pug('${Path.relative('', filePath)}', packageDependency) { ... }`)
  // console.dir(packageDependency)

  let fileDependency = []

  let content = await FileSystem.readFile(filePath, { 'encoding': 'utf-8' })
  let token = null
  let ast = null

  token = Lex(content, { 'filename': filePath })
  ast = Parse(token, { 'filename': filePath })
  ast = Load(ast, { 'lex': Lex, 'parse': Parse })
  // ast = Link(ast)

  // console.dir(ast, { 'depth': null })

  // {
  //   type: 'IncludeFilter',
  //   name: 'markdown-it',
  //   attrs: [],
  //   line: 1,
  //   column: 8,
  //   filename: '/Volumes/DUMBLEDORE1/Users/fficnar/Projects/Shared Projects/mablung-check-dependency/source/test/library/resource/missing/pug-filter-include/template.pug'
  // }

  let node = Query.query(ast, '$..*[?(@.type==\'Filter\' || @.type==\'IncludeFilter\')]')
  let dependency = node.map((node) => GetDependencyName(node.name))

  // let fileDependency = (packageDependency.length <= 0 ? name : packageDependency).filter((dependency) => name.filter((name) => dependency.endsWith(name)).length > 0)
  
  fileDependency = dependency
    .map((dependency) => packageDependency
      .filter((packageDependency) => packageDependency.endsWith(dependency))
      .reduce((dependency, packageDependency) => packageDependency, dependency))

  return fileDependency

}