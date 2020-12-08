import Path from 'path';

import { ParseError } from './parse-error.js';

class FileParseError extends ParseError {

  constructor(path, parseError) {
    super(`An error occurred parsing the file at '${Path.relative('', path)}' (${parseError.message}).`, parseError);
  }}



export { FileParseError };
//# sourceMappingURL=file-parse-error.js.map