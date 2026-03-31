import express from 'express';
import {
  getPublicGalleries,
  getGalleryBySlug,
  getAllAdminGalleries,
  createGallery,
  updateGallery,
  deleteGallery
} from '../controllers/galleryController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// ==========================================
// 🌍 PUBLIC ROUTES (Accessible to everyone)
// ==========================================
router.get('/', getPublicGalleries);
router.get('/slug/:slug', getGalleryBySlug);


// ==========================================
// 🛡️ ADMIN PROTECTED ROUTES 
// ==========================================
router.use(protect);
router.use(restrictTo('super-admin', 'admin'));

// Fetch all for admin dashboard
router.get('/admin/all', getAllAdminGalleries);

// Create new album
router.post('/', createGallery);

// Update or Delete specific album by MongoDB _id
router
  .route('/:id')
  .patch(updateGallery)
  .delete(deleteGallery);

export default router;