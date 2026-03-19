import logger from '../config/logger.js';
import AppError from '../utils/AppError.js';

// Helper functions to format ugly MongoDB errors
const handleCastErrorDB = err => new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
const handleDuplicateFieldsDB = err => {
  const value = Object.values(err.keyValue)[0];
  return new AppError(`Duplicate field value: '${value}'. Please use another value!`, 400);
};
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;
  error.name = err.name; // Keep the original name for checking

  // Convert ugly MongoDB errors into clean Operational AppErrors
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

  // 1. Log the error
  if (error.isOperational) {
    logger.warn(`Operational Error: ${error.message}`);
  } else {
    logger.error(`CRITICAL ERROR 💥: ${error.message}\nStack: ${err.stack}`);
  }

  // 2. Send the response
  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.isOperational ? error.message : 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack, error: err })
  });
};