const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

// function fixUsersStructure(user) {
//   if (user) {
//     DB.Tasks.filter(task => task).forEach(task => {
//       task.userId = task.userId === user.id ? null : task.userId;
//     });
//   }
// }

// function fixBoardsStructure(board) {
//   if (board) {
//     DB.Tasks.filter(task => task && task.boardId === board.id).forEach(
//       task => (DB.Tasks[DB.Tasks.indexOf(task)] = undefined)
//     );
//   }
// }

// function fixTasksStructure() {}

function initDB() {
  DB.Users.push(
    new User({ id: '1' }),
    new User({ id: '2' }),
    new User({ id: '3' })
  );
  const board = new Board({ id: '11' });
  DB.Boards.push(board);
  DB.Tasks.push(
    new Task({ boardId: board.id, id: '111' }),
    new Task({ boardId: board.id, id: '112' })
  );
}
initDB();

const getAllEntities = tableName => deepCopy(DB[tableName]);

const getEntity = (tableName, id) => {
  const entities = DB[tableName].filter(x => x.id === id);

  if (entities.length > 1) {
    throw Error(`The DB data is damaged. Table: ${tableName}, entityId: ${id}`);
  }

  return deepCopy(entities[0]);
};

const createEntity = (tableName, entity) => {
  DB[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

const updateEntity = (tableName, id, entity) => {
  const index = DB[tableName].findIndex(x => x.id === id);
  if (index > -1) {
    Object.assign(DB[tableName][index], entity);
  }
  return getEntity(tableName, id);
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  const index = DB[tableName].findIndex(x => x.id === id);
  if (entity) {
    DB[tableName].splice(index, 1);
    // DB[`fix${tableName}Structure`](entity);
    // const index = DB[tableName].indexOf(entity);
    // DB[tableName] = [
    //   ...DB[tableName].slice(0, index),
    //   ...(DB[tableName].length > index + 1
    //     ? DB[tableName].slice(index + 1)
    //     : [])
    // ];
  }

  return entity;
};

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  removeEntity
};
