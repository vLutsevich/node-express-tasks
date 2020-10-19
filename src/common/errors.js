const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  getStatusText
} = require('http-status-codes');

const { logger } = require('./logger');

class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
  }
}

const errorHandler = (err, req, res, next) => {
  logger.error(`Internal error: ${err.message}`);
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND).send(err.message);
  } else if (err) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

const catchErrors = func => {
  return async (req, res, next) => {
    try {
      return await func(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = { NotFoundError, errorHandler, catchErrors };
