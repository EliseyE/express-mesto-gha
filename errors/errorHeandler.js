const BadRequestError = require('./bad-request-error');
const NotFoundError = require('./not-found-error');
const ConflictError = require('./conflict-error');
const InternalServerError = require('./internal-server-error');

module.exports.errorHeandler = (err) => {
  if ((err.statusCode >= 400) && (err.statusCode <= 599)) {
    return err;
  }

  switch (err.name) {
    case 'ValidationError': {
      const validationErrors = Object.values(err.errors).map((error) => error.name).join('; ');
      return new BadRequestError({ message: 'Validation Error', validationErrors });
    }
    case 'CastError': {
      return new BadRequestError({ message: err.message });
    }
    case 'DocumentNotFoundError': {
      return new NotFoundError(`DocumentNotFoundError: ${err.message}`);
    }
    case 'MongoServerError': {
      if (err.code === 11000) {
        return new ConflictError({ message: err.message });
      }
      return new InternalServerError({ message: err.message });
    }
    default:
      return new InternalServerError({ message: err.message });
  }
};
