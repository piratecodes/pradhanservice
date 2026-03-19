import express from 'express';
import {
  createStaff,
  getAllAdmins,
  getAdminById,
  updateStaff,
  deactivateStaff,
  deleteStaff,
  getMe,
  setMeAsParam,
  getDashboardStats
} from '../controllers/adminController.js';
import { uploadSingleImage } from '../middlewares/uploadMiddleware.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// ======================================================
// 🛡️ LEVEL 1: MUST BE LOGGED IN (Any Staff Member)
// ======================================================
// This checkpoint stops all unauthenticated internet traffic
router.use(protect);

// 1. Personal Profile Routes
router.get('/me', getMe);
router.patch('/me/upload-photo', setMeAsParam, uploadSingleImage, updateStaff);

// 2. Dashboard Stats
router.get('/dashboard-stats', getDashboardStats);


// ======================================================
// 🛑 LEVEL 2: ADMINS & SUPER-ADMINS ONLY
// ======================================================
// The Bouncer: Sales Agents are completely blocked from passing this line!
router.use(restrictTo('super-admin', 'admin'));

// 3. Collection Routes (The Staff Roster)
router
  .route('/')
  .get(getAllAdmins) // 🔒 Locked: Sales agents cannot see the staff list
  .post(restrictTo('super-admin'), createStaff); // 🔒 Locked: Only Super-Admin can hire

// 4. Specific User Routes
router
  .route('/:id')
  .get(getAdminById) // 🔒 Locked: Sales agents cannot spy on specific profiles
  .patch(updateStaff) // 🔒 Locked: Admins can update staff
  .delete(restrictTo('super-admin'), deleteStaff); // 🔒 Locked: Only Super-Admin can hard delete

// 5. Soft Delete / Suspension
router.patch('/:id/deactivate', restrictTo('super-admin'), deactivateStaff);

export default router;