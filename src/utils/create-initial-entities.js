const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const createInitialEntities = () => {
  const users = [
    new User({ name: 'user1', login: 'admin', password: 'admin' }),
    new User({ name: 'user2', login: 'login2', password: 'password222' })
  ];

  const board1 = new Board({ title: 'board1' });
  const board2 = new Board({ title: 'board2' });

  const boards = [board1, board2];

  const tasks = [
    new Task({ boardId: board1.id }),
    new Task({ boardId: board2.id })
  ];

  // User.insertMany(users);

  users.forEach(user => user.save());
  boards.forEach(board => board.save());
  tasks.forEach(task => task.save());
};

module.exports = {
  createInitialEntities
};
