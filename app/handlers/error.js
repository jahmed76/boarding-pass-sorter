const { APIError } = require("../helpers");

function globalErrorHandler(error, request, response, next) {
  let err = error;
  if (!(error instanceof APIError)) {
    err = new APIError(500, error.type, error.message);
  }

  return response.status(err.status).json(err);
}

module.exports = {
  globalErrorHandler
};
