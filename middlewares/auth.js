require('dotenv').config();
const JWT = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET } = require('../appConfig');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) next(new UnauthorizedError('Authorization required'));

  let payload;

  try {
    payload = JWT.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Authorization required'));
  }

  req.user = payload;
  next();
};
