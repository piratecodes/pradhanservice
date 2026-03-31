import express from 'express';
import {
  createPage,
  getAllPages,
  getPageBySlugs,
  updatePage,
  deletePage,
  getCloudinarySignature
} from '../controllers/locationPageController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import { cacheRoute } from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// --- 1. PUBLIC ROUTE (For Next.js) ---
// This is what MasterServiceRouter calls: GET /api/v1/pages/kolkata/packers-and-movers
// We add cacheRoute to keep it lightning fast for SEO bots.
router.get('/:citySlug/:serviceSlug', getPageBySlugs);


// ======================================================
// 🛡️ ADMIN SECURITY GATE: Everything below requires Login
// ======================================================
router.use(protect);
router.use(restrictTo('super-admin', 'admin'));

router.get('/cloudinary-signature', getCloudinarySignature);

// --- 2. CRUD OPERATIONS (For Vite Admin Panel) ---
router
  .route('/')
  .get(getAllPages)      // List all created SEO pages
  .post(createPage);     // Create a new City+Service combination

router
  .route('/:id')
  .patch(updatePage)     // Edit existing content/sections
  .delete(deletePage);   // Permanently remove a page

export default router;