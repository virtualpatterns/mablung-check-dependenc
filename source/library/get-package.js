import FileSystem from 'fs-extra'
import Json from 'json5'
import Path from 'path'

export function GetPackage(path) { return Json.parse(FileSystem.readFileSync(Path.resolve(path, 'package.json'), { 'encoding': 'utf-8' })) }
