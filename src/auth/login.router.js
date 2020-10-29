const router = require('express').Router();
const { catchErrors } = require('../common/errors');
const userService = require('../resources/users/user.service');
const loginService = require('./login.service');
const { FORBIDDEN, LOCKED } = require('http-status-codes');

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await userService.getUserByLogin(req.body.login);
    if (user) {
      const isValid = await loginService.isPasswordValid(
        user.password,
        req.body.password
      );
      if (isValid) {
        const token = loginService.getToken(user._id, user.login);
        res.header('Authorization', token).send({ token });
      } else {
        res.status(LOCKED).json('incorrect password');
        // throw new Error('incorrect password'); // LOCKED
      }
    } else {
      res.status(FORBIDDEN).json('user not authorized');
      // throw new Error('user not authorized'); // FORBIDDEN
    }
  })
);

module.exports = router;
