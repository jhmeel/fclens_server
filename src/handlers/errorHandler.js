import logger from "../utils/logger.js";
class ErrorHandler extends Error {
  constructor(
    statusCode,
    message,
    description = `Error "${statusCode}". "${message}"`,
    internalLog = description
  ) {
    super(
      `(HttpResponseError) status: "${statusCode}" description: "${description}"`
    );
    logger.error(description);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
