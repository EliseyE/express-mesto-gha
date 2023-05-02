const {
  INTERNAL_SERVER_ERROR,
} = require('./error-codes');

const centralErrorUnit = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).json({ message: statusCode === INTERNAL_SERVER_ERROR ? 'Internal Server Error' : message });
  next();
};

module.exports = centralErrorUnit;
