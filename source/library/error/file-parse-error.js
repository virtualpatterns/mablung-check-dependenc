import Path from 'path'

import { ParseError } from './parse-error.js'

class FileParseError extends ParseError {

  constructor(path, error) {
    super(`An error occurred parsing the file at '${Path.relative('', path)}' (${error.message}).`, error)
  }

}

export { FileParseError }
