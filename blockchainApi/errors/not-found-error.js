class NotFoundError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = 404;
      this.status = 404;
      this.isOperational = true;
    }
  }
  
module.exports = NotFoundError;