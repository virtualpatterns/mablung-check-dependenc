import FileSystem from 'fs-extra'
import JSON from 'jsonpath'

import Lex from 'pug-lexer'
import Load from 'pug-load'
import Parse from 'pug-parser'

import { GetDependencyName } from '../get-dependency-name.js'

export async function Pug(path) {

  let content = await FileSystem.readFile(path, { 'encoding': 'utf-8' })
  let token = Lex(content, { 'filename': path })
  
  let ast = null
  ast = Parse(token, { 'filename': path })
  ast = Load(ast, { 'lex': Lex, 'parse': Parse })

  // console.dir(ast, { 'depth': null })

  let node = JSON.query(ast, '$..*[?(@.type==\'Filter\' || @.type==\'IncludeFilter\')]')
  let dependency = node.map((node) => GetDependencyName(node.name))

  return dependency

}