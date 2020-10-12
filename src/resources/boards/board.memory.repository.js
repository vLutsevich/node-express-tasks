const DB = require('../../common/in-memory-db');
const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);
  if (!board) {
    throw Error(`The user with id ${id} was not found!`);
  }

  return board;
};

const create = async user => DB.createEntity(TABLE_NAME, user);

const update = async (id, user) => {
  const updatedUser = await DB.updateEntity(TABLE_NAME, id, user);

  if (!updatedUser) {
    throw Error(`The user with id ${id} was not found!`);
  }

  return updatedUser;
};

const remove = async id => {
  const user = await DB.removeEntity(TABLE_NAME, id);

  if (!user) {
    throw Error(`The user with id ${id} was not found!`);
  }
};

module.exports = { getAll, get, create, update, remove };
