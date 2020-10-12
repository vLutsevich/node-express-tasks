const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const create = task => tasksRepo.create(task);

const update = task => tasksRepo.update(task);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = { getAll, get, create, update, remove };
