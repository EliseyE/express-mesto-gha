const { checkToken } = require('../utils/token');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const checkResult = checkToken(token);

  if (!checkResult) return res.status(401).json({ error: 'Access denied' });

  req.user = { _id: '111111111122222222223333' };
  next();
};


// function checkToken(token) {
//   if (!token) return false;

//   try {
//     return JWT.verify(token, JWT_SECRET);
//   } catch {
//     return false;
//   }
// }
