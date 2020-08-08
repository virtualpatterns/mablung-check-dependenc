import Path from 'path';

import { ParseError } from './parse-error.js';

class FolderParseError extends ParseError {

  constructor(path, parseError) {
    super(`An error occurred parsing the folder '${Path.relative('', path)}' (${parseError.message}).`, parseError);
  }}



export { FolderParseError };
//# sourceMappingURL=folder-parse-error.js.map