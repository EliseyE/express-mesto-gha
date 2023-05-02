require('dotenv').config();
const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).send({ message: 'Authorization required' });

  let payload;

  try {
    payload = JWT.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  req.user = payload;
  next();
};
