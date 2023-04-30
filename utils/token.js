const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

function generateToken(payload, tokenLifeTime) {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: tokenLifeTime });
}

function checkToken(token) {
  if (!token) return false;

  try {
    return JWT.verify(token, JWT_SECRET);
  } catch {
    return false;
  }
}

module.exports = {
  generateToken,
  checkToken,
};
