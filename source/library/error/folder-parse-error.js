import Path from 'path'

import { ParseError } from './parse-error.js'

class FolderParseError extends ParseError {

  /* c8 ignore next 3 */
  constructor(path, parseError) {
    super(`An error occurred parsing the folder '${Path.relative('', path)}' (${parseError.message}).`, parseError)
  }

}

export { FolderParseError }
