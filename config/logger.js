import winston from 'winston';

// 1. Define how we want the text to look inside the log files
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  // If there's a stack trace (for critical errors), print it, otherwise just the message
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// 2. Create the actual logger engine
const logger = winston.createLogger({
  // Log 'debug' details in development, but only important 'info' and 'error' in production
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Tells Winston to capture stack traces
    logFormat
  ),
  transports: [
    // 3. Save all critical errors to a dedicated file
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    
    // 4. Save every single log (info, warnings, errors) to a master file
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    }),
  ],
});

// 5. If we are running locally on your computer, also print to the terminal with colors
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;