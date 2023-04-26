const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
} = require('./constants');

module.exports.errorHeandler = (err, res) => {
  switch (err.name) {
    case 'ValidationError': {
      const validationErrors = Object.values(err.errors).map((error) => error.name).join('; ');
      res.status(BAD_REQUEST_CODE).send({ message: 'Validation Error', validationErrors });
      break;
    }
    case 'CastError': {
      res.status(BAD_REQUEST_CODE).send({ message: err.message });
      break;
    }
    case 'DocumentNotFoundError': {
      res.status(NOT_FOUND_CODE).send({ message: err.message });
      break;
    }
    default:
      res.status(SERVER_ERROR_CODE).send({ message: err.message });
  }
};
