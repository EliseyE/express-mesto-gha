const BadRequestError = require('./bad-request-error');
const NotFoundError = require('./not-found-error');
const ConflictError = require('./conflict-error');
const InternalServerError = require('./internal-server-error');

module.exports.errorHeandler = (err) => {
  if ((err.statusCode >= 400) && (err.statusCode <= 599)) {
    throw err;
  }

  switch (err.name) {
    case 'ValidationError': {
      const validationErrors = Object.values(err.errors).map((error) => error.name).join('; ');
      throw new BadRequestError({ message: 'Validation Error', validationErrors });
    }
    case 'CastError': {
      throw new BadRequestError({ message: err.message });
    }
    case 'DocumentNotFoundError': {
      throw new NotFoundError({ message: err.message });
    }
    case 'MongoServerError': {
      if (err.code === 11000) {
        throw new ConflictError({ message: err.message });
      }
      throw new InternalServerError({ message: err.message });
    }
    default:
      throw new InternalServerError({ message: err.message });
  }
};
