const User = require('../resources/users/user.model');

const createAdmin = () => {
  return User.create({ login: 'admin', password: 'admin', name: 'valery' });
};

module.exports = {
  createAdmin
};
