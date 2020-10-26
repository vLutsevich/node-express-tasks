const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const { catchErrors } = require('../../common/errors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const task = await taskService.get(req.params.boardId, req.params.id);
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await taskService.create(
      new Task({ ...req.body, boardId: req.params.boardId })
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const task = await taskService.update(req.params.id, req.body); // boardId: req.params.boardId
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    await taskService.remove(req.params.id);
    res.json({});
  })
);

module.exports = router;
