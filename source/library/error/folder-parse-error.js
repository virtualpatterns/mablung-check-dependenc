import Path from 'path'

import { ParseError } from './parse-error.js'

class FolderParseError extends ParseError {

  constructor(path, error) {
    super(`An error occurred parsing the folder '${Path.relative('', path)}' (${error.message}).`, error)
  }

}

export { FolderParseError }
