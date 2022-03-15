import FileSystem from 'fs-extra'
import JsonParse from 'json5'
import Path from 'path'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

export const Package = JsonParse.parse(FileSystem.readFileSync(Path.resolve(FolderPath, '../../../package.json'), { 'encoding': 'utf-8' }))
