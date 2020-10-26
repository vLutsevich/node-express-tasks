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
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, password, columns } = board;
  return { id, title, password, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
