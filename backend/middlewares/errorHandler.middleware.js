function errorHandlerMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err.stack);
  res.status(500).send("Something broke!");
}

module.exports = errorHandlerMiddleware;
