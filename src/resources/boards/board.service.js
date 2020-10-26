const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async id => {
  await boardsRepo.remove(id);
  await tasksService.deleteBoardTasks(id);
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
