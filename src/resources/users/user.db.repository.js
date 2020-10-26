const User = require('./user.model');
const { NotFoundError } = require('../../common/errors');

const getAll = () => User.find({});

const get = async id => {
  const user = User.findById(id);
  if (!user) {
    throw new NotFoundError(`The user with id ${id} was not found!`);
  }

  return user;
};

const create = user => User.create(user);

const update = async (id, user) => {
  const updatedUser = User.findOneAndUpdate({ _id: id }, user);

  if (!updatedUser) {
    throw new NotFoundError(`The user with id ${user.id} was not found!`);
  }

  return updatedUser;
};

const remove = async id => {
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new NotFoundError(`The user with id ${id} was not found!`);
  }
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
