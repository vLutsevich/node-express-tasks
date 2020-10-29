const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const getUserByLogin = login => usersRepo.getUserByLogin(login);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await usersRepo.remove(id);
  await tasksService.unassignUserTasks(id);
};

module.exports = {
  getAll,
  get,
  getUserByLogin,
  create,
  update,
  remove
};
