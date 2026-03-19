import rateLimit from 'express-rate-limit';

// 1. GENERAL LIMITER (For browsing the site)
export const apiLimiter = rateLimit({
  max: 1000, // 1000 requests per 15 minutes (plenty for a normal user)
  windowMs: 15 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  standardHeaders: true, 
  legacyHeaders: false, 
});

// 2. STRICT AUTH LIMITER (For login attempts)
export const authLimiter = rateLimit({
  max: 10, // Only 10 login attempts per hour allowed!
  windowMs: 60 * 60 * 1000, 
  message: 'Too many login attempts from this IP, please try again after an hour.',
  standardHeaders: true,
  legacyHeaders: false,
});