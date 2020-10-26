const uuid = require('uuid');
const mongoose = require('mongoose');

// class Board {
//   constructor({
//     id = uuid(),
//     title = 'board title',
//     columns = { id: null, title: '', order: 0 }
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }

const boardSchema = new mongoose.Schema(
  {
    title: String,
    password: String,
    columns: Array,
    id: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
