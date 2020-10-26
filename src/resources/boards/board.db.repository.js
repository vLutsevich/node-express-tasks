const Board = require('./board.model');
const { NotFoundError } = require('../../common/errors');

const getAll = () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NotFoundError(`The board with id ${id} was not found!`);
  }

  return board;
};

const create = async board => {
  const newBoard = await Board.create(board);
  return newBoard;
};

const update = async (id, board) => {
  const updatedBoard = await Board.findOneAndUpdate({ _id: id }, board);

  if (!updatedBoard) {
    throw new NotFoundError(`The board with id ${board.id} was not found!`);
  }

  return updatedBoard;
};

const remove = async id => {
  const board = await Board.findOneAndDelete({ _id: id });

  if (!board) {
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
