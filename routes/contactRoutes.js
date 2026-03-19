import express from 'express';
import {
  getContactInfo,
  updateContactInfo
} from '../controllers/contactController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// --- PUBLIC ROUTES (For your Next.js footer and Contact page) ---
router.get('/', getContactInfo);

// 🛡️ SECURITY CHECKPOINT: Everything below requires Super Admin or Admin access
router.use(protect);
router.use(restrictTo('super-admin', 'admin'));

// --- ADMIN ROUTES (For your Vite dashboard settings page) ---
// We use a simple POST/PATCH on the root URL to update the global settings
router.patch('/', updateContactInfo);
router.post('/', updateContactInfo); // Just in case the frontend sends a POST instead

export default router;