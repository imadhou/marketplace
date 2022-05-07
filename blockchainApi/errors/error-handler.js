
module.exports = (err, req, resp, next) => {
  err.statusCode = err.statusCode * 1 || 500;
  err.status = err.status || 'error';
  if (err.isOperational) {
    resp.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);
    resp.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};