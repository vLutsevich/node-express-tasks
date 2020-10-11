const DB = require('../../common/inMemoryDb');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw Error(`The user with id ${id} was not found!`);
  }

  return user;
};

const create = async user => DB.createUser(user);

const update = async (id, userData) => {
  const user = await DB.getUser(id);

  if (!user) {
    throw Error(`The user with id ${id} was not found!`);
  }

  return DB.updateUser(id, userData);
};

const remove = async id => {
  DB.removeUser(id);
};

module.exports = { getAll, get, create, update, remove };
