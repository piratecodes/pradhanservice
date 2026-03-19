import express from 'express';
import {
  createOption,
  getAllOptions,
  getOptionsByService,
  updateOption,
  toggleOptionStatus,
  deleteOption // <-- 1. The new function is imported here
} from '../controllers/serviceOptionController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// --- PUBLIC ROUTE (For your Next.js form component) ---
router.get('/service/:serviceSlug', getOptionsByService);

// ==========================================
// 🛡️ SECURITY CHECKPOINT: Admins Only Below
// ==========================================
router.use(protect);
router.use(restrictTo('super-admin', 'admin'));

// --- ADMIN ROUTES (For your Vite dashboard) ---
router.route('/')
  .get(getAllOptions)
  .post(createOption);

router.patch('/:id/toggle', toggleOptionStatus);

// 👇 THIS IS THE CRITICAL BLOCK 👇
router.route('/:id')
  .patch(updateOption)
  .delete(deleteOption); // <-- 2. The DELETE route is officially registered here!

export default router;