import { CheckError } from './check-error.js'

class ParseError extends CheckError {

  constructor(message, error) {
    super(message)
    this.error = error
  }

}

export { ParseError }
