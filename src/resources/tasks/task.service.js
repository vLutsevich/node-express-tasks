const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const create = task => tasksRepo.create(task);

const update = (id, task) => tasksRepo.update(id, task);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

const unassignUserTasks = userId => tasksRepo.unassignUserTasks(userId);

const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  unassignUserTasks,
  deleteBoardTasks
};
