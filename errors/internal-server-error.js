const { INTERNAL_SERVER_ERROR_CODE } = require('./error-codes');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = INTERNAL_SERVER_ERROR_CODE;
  }
}

module.exports = InternalServerError;
