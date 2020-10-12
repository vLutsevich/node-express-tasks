const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

// update = board => boardsRepo.update(board.id, board)
const update = (id, board) => boardsRepo.update(id, board);

const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
