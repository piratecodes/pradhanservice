import Gallery from '../models/Gallery.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { clearCache } from '../middlewares/cacheMiddleware.js';

// ==========================================
// 🌍 PUBLIC ROUTES (For Next.js Frontend)
// ==========================================

// Get all PUBLISHED galleries
export const getPublicGalleries = catchAsync(async (req, res, next) => {
  const galleries = await Gallery.find({ isPublished: true }).sort({ createdAt: -1 });
  successResponse(res, 200, 'Published galleries retrieved', { count: galleries.length, galleries });
});

// Get a single PUBLISHED gallery by its slug
export const getGalleryBySlug = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findOne({ slug: req.params.slug, isPublished: true });
  
  if (!gallery) {
    return next(new AppError('Gallery not found or is currently a draft', 404));
  }
  
  successResponse(res, 200, 'Gallery retrieved', { gallery });
});

// ==========================================
// 🛡️ ADMIN ROUTES (For Vite Admin Panel)
// ==========================================

// Get ALL galleries (including Drafts)
export const getAllAdminGalleries = catchAsync(async (req, res, next) => {
  const galleries = await Gallery.find().sort({ createdAt: -1 });
  successResponse(res, 200, 'All admin galleries retrieved', { count: galleries.length, galleries });
});

// Create a new Gallery Album
export const createGallery = catchAsync(async (req, res, next) => {
  const newGallery = await Gallery.create(req.body);
  
  // Clear frontend cache if applicable
  clearCache('/photo-gallery'); 
  
  successResponse(res, 201, 'Gallery album created successfully!', { gallery: newGallery });
});

// Update a Gallery Album (Add/Remove images, edit details)
export const updateGallery = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!gallery) return next(new AppError('Gallery album not found', 404));
  
  clearCache('/photo-gallery');
  clearCache(`/photo-gallery/${gallery.slug}`);
  
  successResponse(res, 200, 'Gallery updated successfully', { gallery });
});

// Delete a Gallery Album entirely
export const deleteGallery = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findByIdAndDelete(req.params.id);
  
  if (!gallery) return next(new AppError('Gallery album not found', 404));
  
  clearCache('/photo-gallery');
  
  successResponse(res, 200, 'Gallery album deleted permanently', null);
});