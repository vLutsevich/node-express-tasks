class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.status = '404';
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof NotFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.status(500).send(err.message);
  }
  next();
};

const catchErrors = func => {
  return async (req, res, next) => {
    try {
      return await func(req, res, next);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
};

module.exports = { NotFoundError, errorHandler, catchErrors };
