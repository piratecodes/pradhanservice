import express from 'express';
import {
  createGalleryItem,
  getAllMedia,
  updateMedia,
  deleteMedia,
  uploadGalleryPhoto
} from '../controllers/galleryController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// --- PUBLIC ROUTES (For your Next.js UI componant) ---
// Your frontend will call this to build the photo/video gallery pages
router.get('/', getAllMedia);

// 🛡️ SECURITY CHECKPOINT: Everything below requires Admin access
router.use(protect);
router.use(restrictTo('super-admin', 'admin'));

// --- ADMIN ROUTES (For your Vite dashboard) ---
// Note the upload middleware sitting exactly between the route and the controller!
router.post('/', uploadGalleryPhoto, createGalleryItem);
router.patch('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;