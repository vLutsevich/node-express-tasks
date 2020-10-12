const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.boardId, req.params.id);
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({ ...req.body, boardId: req.params.boardId })
  );
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await taskService.update(
      new Task({
        ...req.body,
        id: req.params.id,
        boardId: req.params.boardId
      })
    );
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await taskService.remove(req.params.id);
    res.json({});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
