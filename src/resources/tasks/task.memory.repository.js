const DB = require('../../common/in-memory-db');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  const a = await DB.getAllEntities(TABLE_NAME);
  return a.filter(x => x.boardId === boardId);
};

const get = async (boardId, id) => {
  const task = await DB.getEntity(TABLE_NAME, id);
  if (!task || task.boardId !== boardId) {
    throw Error(`The task with id ${id} on board ${boardId} was not found!`);
  }

  return task;
};

const create = async task => DB.createEntity(TABLE_NAME, task);

const update = async task => {
  const updatedUser = await DB.updateEntity(TABLE_NAME, task.id, task);

  if (!updatedUser) {
    throw Error(
      `The task with id ${task.id} on board ${task.boardId} was not found!`
    );
  }

  return updatedUser;
};

const remove = async id => {
  const task = await DB.removeEntity(TABLE_NAME, id);

  if (!task) {
    throw Error(
      `The task with id ${id} on board ${task.boardId} was not found!`
    );
  }
};

module.exports = { getAll, get, create, update, remove };
