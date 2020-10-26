const { NotFoundError } = require('../../common/errors');
const Task = require('./task.model');

const getAll = () => Task.find({});

const get = async (boardId, id) => {
  const task = await Task.findById(id);

  if (!task || task.boardId !== boardId) {
    throw new NotFoundError(
      `The task with id ${id} on board ${boardId} was not found!`
    );
  }

  return task;
};

const create = async task => {
  const newTask = await Task.create(task);
  return newTask;
};

const update = async (id, task) => {
  const updatedTask = await Task.findOneAndUpdate({ _id: id }, task);
  if (!updatedTask) {
    throw new NotFoundError(
      `The task with id ${task.id} on board ${task.boardId} was not found!`
    );
  }

  return updatedTask;
};

const remove = async id => {
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    throw new NotFoundError(
      `The task with id ${id} on board ${task.boardId} was not found!`
    );
  }
  return task;
};

const unassignUserTasks = userId =>
  Task.updateMany({ userId }, { userId: null });

const deleteBoardTasks = boardId => Task.deleteMany({ boardId });

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  unassignUserTasks,
  deleteBoardTasks
};
