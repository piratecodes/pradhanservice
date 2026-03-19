import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import path from 'path';
import { filterXSS } from 'xss';

// Local Imports
import logger from './config/logger.js';
import AppError from './utils/AppError.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';

// Routes Imports
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import serviceOptionRoutes from './routes/serviceOptionRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// --- REPAIR STEP: UNLOCK READ-ONLY PROPERTIES ---
// This prevents the "Cannot set property query... which has only a getter" crash in Node v22
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});

// 1. WATCHDOG
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// 2. SECURITY HEADERS & CORS
app.use(helmet({
  // This allows your Vite frontend to load the images from the uploads folder!
  crossOriginResourcePolicy: { policy: "cross-origin" } 
}));

const allowedOrigins = [ process.env.MAIN_WEBSITE_URL, process.env.ADMIN_PANEL_URL ];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, or Postman)
    if (!origin) return callback(null, true); 
    
    // If the origin isn't in our array, throw our custom AppError
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new AppError('The CORS policy for this site does not allow access from the specified Origin.', 403), false);
    }
    
    // Otherwise, let it through!
    return callback(null, true);
  },
  credentials: true 
}));

// --- TEMPORARY DEMO BYPASS ---
// app.use(cors({
//   origin: true, // This magic word tells the API to accept requests from ANY link
//   credentials: true 
// }));

// 3. RATE LIMITING
app.use('/api', apiLimiter);

// 4. BODY PARSER & SANITIZATION
app.use(express.json({ limit: '10kb' })); 

// Clean against NoSQL Injection
app.use(mongoSanitize());

// Clean against XSS (Script Injection)
app.use((req, res, next) => {
  if (req.body) {
    const stringifiedBody = JSON.stringify(req.body);
    const sanitizedBody = filterXSS(stringifiedBody);
    req.body = JSON.parse(sanitizedBody);
  }
  next();
});

// 5. PUBLIC STATIC FOLDER
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// 6. HEALTH CHECK
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Pradhan API Watchdog is awake and secure!' });
});

// 7. MOUNT ACTUAL ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/service-options', serviceOptionRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/contact', contactRoutes);

// 8. ROUTE CATCHER
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 9. GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;