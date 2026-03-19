import express from 'express';
import { 
  setupFirstAdmin, 
  login, 
  protect, 
  getMe, 
  forgotPassword, 
  resetPassword 
} from '../controllers/authController.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// 1. ONE-TIME SETUP
router.post('/setup', setupFirstAdmin);

// 2. LOGIN
router.post('/login', authLimiter, login);

// 3. GET CURRENT USER
router.get('/me', protect, getMe);

// 👇 4. FORGOT & RESET PASSWORD 👇
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

export default router;