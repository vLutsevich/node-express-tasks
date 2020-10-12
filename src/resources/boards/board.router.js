const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board(req.body));
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(
      new Board({ ...req.body, id: req.params.id })
    );
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.json({});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
