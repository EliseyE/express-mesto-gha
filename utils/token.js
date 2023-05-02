require('dotenv').config();
const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

function generateToken(payload, tokenLifeTime) {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: tokenLifeTime });
}

module.exports = {
  generateToken,
};
