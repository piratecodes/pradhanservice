import dotenv from 'dotenv';
// MUST load environment variables before importing anything else
dotenv.config(); 

import logger from './config/logger.js';

// FAIL-SAFE 1: Catch synchronous bugs (like a typo in a variable name)
process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION! 💥 Shutting down... \n${err.name}: ${err.message}\n${err.stack}`);
  process.exit(1);
});

import app from './app.js';
import connectDB from './config/db.js';

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// FAIL-SAFE 2: Catch asynchronous bugs (like the database connection dropping)
process.on('unhandledRejection', (err) => {
  logger.error(`UNHANDLED REJECTION! 💥 Shutting down gracefully... \n${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});