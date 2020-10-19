const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/task.model');

// function initDB() {
//   DB.Users.push(
//     new User({ id: '1' }),
//     new User({ id: '2' }),
//     new User({ id: '3' })
//   );
//   const board = new Board({ id: '11' });
//   DB.Boards.push(
//     board,
//     new Board({ id: '22' }),
//     new Board({ id: '33' }),
//     new Board({ id: '44' })
//   );
//   DB.Tasks.push(
//     new Task({ boardId: board.id, id: '111' }),
//     new Task({ boardId: board.id, id: '112' })
//   );
// }
// initDB();

const getAllEntities = async tableName => deepCopy(DB[tableName]);

const getEntity = async (tableName, id) => {
  const entities = DB[tableName].filter(x => x.id === id);

  if (entities.length > 1) {
    throw Error(`The DB data is damaged. Table: ${tableName}, entityId: ${id}`);
  }

  return deepCopy(entities[0]);
};

const createEntity = async (tableName, entity) => {
  DB[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

const updateEntity = async (tableName, id, entity) => {
  const index = DB[tableName].findIndex(x => x.id === id);
  if (index > -1) {
    Object.assign(DB[tableName][index], entity);
  }
  return getEntity(tableName, id);
};

const removeEntity = async (tableName, id) => {
  const entity = getEntity(tableName, id);
  const index = DB[tableName].findIndex(x => x.id === id);
  if (entity) {
    DB[tableName].splice(index, 1);
    if (tableName === 'Boards') {
      deleteBoardHook(id);
    } else if (tableName === 'Users') {
      deleteUserHook(id);
    }
  }

  return entity;
};

function deleteBoardHook(boardId) {
  DB.Tasks = DB.Tasks.filter(task => task.boardId !== boardId);
}

function deleteUserHook(userId) {
  DB.Tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
}

function deepCopy(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  removeEntity
};
