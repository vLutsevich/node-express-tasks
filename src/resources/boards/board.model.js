const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'board title',
    columns = { id: null, title: '', order: 0 }
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
