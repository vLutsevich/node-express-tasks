const DB = require('../../common/in-memory-db');
const TABLE_NAME = 'Boards';

const getAll = async () => await DB.getAllEntities(TABLE_NAME);

const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);
  if (!board) {
    throw Error(`The board with id ${id} was not found!`);
  }

  return board;
};

const create = async board => DB.createEntity(TABLE_NAME, board);

const update = async board => {
  const updatedBoard = await DB.updateEntity(TABLE_NAME, board.id, board);

  if (!updatedBoard) {
    throw Error(`The board with id ${board.id} was not found!`);
  }

  return updatedBoard;
};

const remove = async id => {
  const board = await DB.removeEntity(TABLE_NAME, id);

  if (!board) {
    throw Error(`The user with id ${id} was not found!`);
  }
};

module.exports = { getAll, get, create, update, remove };
