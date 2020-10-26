const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Data base connected');
  db.dropDatabase();

  // createInitialEntities();

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

// const User = require('./resources/users/user.model');
// const Board = require('./resources/boards/board.model');
// const Task = require('./resources/tasks/task.model');

// function createInitialEntities() {
//   const users = [
//     new User({ name: 'user1', login: 'admin', password: 'admin' }),
//     new User({ name: 'user2', login: 'login2', password: 'password222' })
//   ];

//   const board1 = new Board({ title: 'board1' });
//   const board2 = new Board({ title: 'board2' });

//   const boards = [board1, board2];

//   const tasks = [
//     new Task({ boardId: board1.id }),
//     new Task({ boardId: board2.id })
//   ];

//   // User.insertMany(users);

//   users.forEach(user => user.save());
//   boards.forEach(board => board.save());
//   tasks.forEach(task => task.save());
// }
