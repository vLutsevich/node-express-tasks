const User = require('../resources/users/user.model');

const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => {
  return JSON.parse(JSON.stringify(DB));
};

const getUser = async id => DB.find(x => x.id === id);

const createUser = async user => {
  DB.push(user);
  return getUser(user.id);
};

const updateUser = async (id, userData) => {
  const index = DB.findIndex(x => x.id === id);
  if (index > -1) {
    delete userData.id;
    const updatedUser = Object.assign(DB[index], userData);
    return updatedUser;

    // Object.keys(userData).forEach(k => {
    //   if (k !== 'id') {
    //     userForUpdate[k]=userData[k];
    //   }
    // })
  }
};

const removeUser = async id => {
  DB.filter(x => x.id === id);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
