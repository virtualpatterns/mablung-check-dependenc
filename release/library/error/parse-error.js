import { CheckError } from './check-error.js';

class ParseError extends CheckError {

  constructor(message, parseError) {
    super(message);
    this._parseError = parseError;
  }}



export { ParseError };

//# sourceMappingURL=parse-error.js.map