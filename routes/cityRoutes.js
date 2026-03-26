import express from 'express';
import {
  createCity,
  getAllCities,
  getCityBySlug,
  updateCity,
  toggleCityStatus,
  deleteCityBySlug
} from '../controllers/cityController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import { cacheRoute } from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// --- PUBLIC ROUTES (For your Next.js UI) ---
// 🌟 Added cacheRoute so dropdown lists load instantly from RAM
router.get('/', cacheRoute, getAllCities);

// Your Next.js dynamic page will call this to get the SEO meta tags
router.get('/slug/:slug', cacheRoute, getCityBySlug);

// 🛡️ SECURITY CHECKPOINT: Everything below requires Admin access
router.use(protect);
router.use(restrictTo('super-admin', 'admin'));

// --- ADMIN ROUTES (For your Vite dashboard) ---
router.post('/', createCity);
router.patch('/:id', updateCity);
router.patch('/:id/toggle', toggleCityStatus); // Soft delete / Turn off city
router.delete('/:slug', restrictTo('super-admin'), deleteCityBySlug);

export default router;