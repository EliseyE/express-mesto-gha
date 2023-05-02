const { NOT_FOUND_CODE } = require('./error-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
