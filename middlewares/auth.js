const { checkToken } = require('../utils/token');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const checkResult = checkToken(token);

  if (!checkResult) return res.status(401).json({ error: 'Access denied' });

  next();
};
