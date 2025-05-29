const { logError } = require('../middlewares/logger'); // Ajusta la ruta si es necesario

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  
  const errorInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message,
    stack: err.stack,
    body: req.body,
    headers: req.headers
  };

  logError(errorInfo);

  res.status(statusCode).json({
    message: statusCode === 500
      ? 'Se ha producido un error en el servidor'
      : message,
  });
};

module.exports = errorHandler;