const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../common/errors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.create(new User(req.body));
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const user = await usersService.update(
      new User({ ...req.body, id: req.params.id })
    );
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    await usersService.remove(req.params.id);
    res.json({});
  })
);

module.exports = router;
