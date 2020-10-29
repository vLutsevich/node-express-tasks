const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { UNAUTHORIZED } = require('http-status-codes');

const checkAuthorization = (req, res, next) => {
  const token = req.header('Authorization');
  try {
    req.user = jwt.verify(token.slice(7), JWT_SECRET_KEY);
  } catch (err) {
    res.status(UNAUTHORIZED).json('user not authorized');
    return;
  }
  next();
};

module.exports = { checkAuthorization };
