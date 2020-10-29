const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const loginRouter = require('./auth/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { errorHandler } = require('./common/errors');
const { requestsLog } = require('./common/logger');
const { logger } = require('./common/logger');
const { checkAuthorization } = require('./auth/checkAuthorization');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(requestsLog);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', checkAuthorization, userRouter);
app.use('/boards', checkAuthorization, boardRouter);
boardRouter.use('/:boardId/tasks', checkAuthorization, taskRouter);

app.use(errorHandler);

process.on('uncaughtException', error => {
  logger.error(`captured error: ${error.message}`, () => process.exit(1)); // eslint-disable-line no-process-exit
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
});

// throw Error('uncaughtException ocurred!');
// Promise.reject(Error('unhandledRejection ocurred!'));

module.exports = app;
