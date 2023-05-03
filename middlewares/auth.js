require('dotenv').config();
const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).send({ message: 'Authorization required 1' });

  let payload;

  try {
    payload = JWT.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required 2' });
  }

  req.user = payload;
  next();
};
