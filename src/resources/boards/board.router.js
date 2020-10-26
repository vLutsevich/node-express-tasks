const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { catchErrors } = require('../../common/errors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.json({});
  })
);

module.exports = router;
