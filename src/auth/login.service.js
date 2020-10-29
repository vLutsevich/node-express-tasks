const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getToken = (id, login) => jwt.sign({ id, login }, JWT_SECRET_KEY);

const isPasswordValid = (hashed, password) => bcrypt.compare(password, hashed);

module.exports = { getToken, isPasswordValid };
