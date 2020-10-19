const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.simple(),
  transports: [
    new transports.File({ filename: 'errors.log', level: 'error' }),
    new transports.File({ filename: 'combine.log' }),
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    })
  ]
});

const requestsLog = (req, res, next) => {
  const method = req.method;
  const fullUrl = req.get('host') + req.originalUrl;
  const queryString = JSON.stringify(req.query);
  const bodyString = JSON.stringify(req.body);
  logger.info(
    `request - ${method}, url: ${fullUrl}, query params: ${queryString}, body: ${bodyString}`
  );

  next();
};

module.exports = { requestsLog, logger };
