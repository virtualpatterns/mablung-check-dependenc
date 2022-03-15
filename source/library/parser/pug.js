import FileSystem from 'fs-extra'
import Json from 'jsonpath'

import Lex from 'pug-lexer'
import Load from 'pug-load'
import Parse from 'pug-parser'

import { GetPackageName } from '../get-package-name.js'

export async function Pug(path) {

  let content = await FileSystem.readFile(path, { 'encoding': 'utf-8' })
  let token = Lex(content, { 'filename': path })
  
  let ast = null
  ast = Parse(token, { 'filename': path })
  ast = Load(ast, { 'lex': Lex, 'parse': Parse })

  let _package = Json.query(ast, '$..*[?(@.type==\'Filter\' || @.type==\'IncludeFilter\')]')
    .map((node) => GetPackageName(node.name))

  return _package

}