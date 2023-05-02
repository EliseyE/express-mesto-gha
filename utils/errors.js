const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR,
} = require('./constants');

module.exports.errorHeandler = (err, res) => {
  switch (err.name) {
    case 'ValidationError': {
      const validationErrors = Object.values(err.errors).map((error) => error.name).join('; ');
      res.status(400).send({ message: 'Validation Error', validationErrors });
      break;
    }
    case 'CastError': {
      res.status(400).send({ message: err.message });
      break;
    }
    case 'DocumentNotFoundError': {
      res.status(404).send({ message: err.message });
      break;
    }
    case 'MongoServerError': {
      res.status(409).send({ message: err.message });
      break;
    }
    default:
      res.status(500).send({ message: err.message });
  }
};
