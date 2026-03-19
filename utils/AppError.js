class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Calls the built-in Error constructor

    this.statusCode = statusCode;
    // If it's a 4xx error (like 404), it's a 'fail'. Otherwise, it's an 'error'
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    // This tells our Watchdog that we EXPECTED this error (e.g., wrong password)
    // so it doesn't crash the entire server.
    this.isOperational = true;

    // Captures where exactly the error happened in the code
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;