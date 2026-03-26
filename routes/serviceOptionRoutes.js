import express from 'express';
import {
  createOption,
  getAllOptions,
  getOptionsByService,
  updateOption,
  toggleOptionStatus,
  deleteOption
} from '../controllers/serviceOptionController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import { cacheRoute } from '../middlewares/cacheMiddleware.js'; // 🌟 IMPORTED CACHE ENGINE

const router = express.Router();

// --- PUBLIC ROUTE (For your Next.js form component) ---
// 🌟 Added cacheRoute so your Next.js forms load their dropdowns instantly
router.get('/service/:serviceSlug', cacheRoute, getOptionsByService);

// ==========================================
// 🛡️ SECURITY CHECKPOINT: Admins Only Below
// ==========================================
router.use(protect);
router.use(restrictTo('super-admin', 'admin'));

// --- ADMIN ROUTES (For your Vite dashboard) ---
router.route('/')
  .get(getAllOptions) // Admin dashboard always gets fresh data (No cache here)
  .post(createOption);

router.patch('/:id/toggle', toggleOptionStatus);

// 👇 THIS IS THE CRITICAL BLOCK 👇
router.route('/:id')
  .patch(updateOption)
  .delete(deleteOption); 

export default router;