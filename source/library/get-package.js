import FileSystem from 'fs-extra'
import JsonParse from 'json5'
import Path from 'path'

export function GetPackage(path) { return JsonParse.parse(FileSystem.readFileSync(Path.resolve(path, 'package.json'), { 'encoding': 'utf-8' })) }
