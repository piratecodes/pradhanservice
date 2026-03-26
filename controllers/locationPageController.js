import LocationPage from '../models/LocationPage.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { clearCache } from '../middlewares/cacheMiddleware.js'; // 🌟 IMPORTED CACHE TOOL

// GET ALL (For Admin Dashboard List) - NO CACHE needed here
export const getAllPages = catchAsync(async (req, res, next) => {
  const pages = await LocationPage.find().sort({ updatedAt: -1 });
  successResponse(res, 200, 'SEO pages retrieved', { count: pages.length, pages });
});

// GET ONE BY SLUGS (For Next.js Frontend) - THIS IS THE CACHED ROUTE
export const getPageBySlugs = catchAsync(async (req, res, next) => {
  const { citySlug, serviceSlug } = req.params;
  const page = await LocationPage.findOne({ 
    citySlug: citySlug.toLowerCase(), 
    serviceSlug: serviceSlug.toLowerCase() 
  });

  if (!page) return next(new AppError('No dynamic content found for this route', 404));
  successResponse(res, 200, 'Page data retrieved', { page });
});

// CREATE (For Admin Panel)
export const createPage = catchAsync(async (req, res, next) => {
  const existing = await LocationPage.findOne({ 
    citySlug: req.body.citySlug.toLowerCase(), 
    serviceSlug: req.body.serviceSlug.toLowerCase() 
  });
  
  if (existing) return next(new AppError('A page for this City and Service already exists!', 400));

  const newPage = await LocationPage.create(req.body);
  
  // 🌟 CLEAR CACHE AFTER CREATING
  clearCache(`/${req.body.citySlug}`); // Clears any cached pages for this specific city
  
  successResponse(res, 201, 'SEO Page Published!', { page: newPage });
});

// UPDATE (For Admin Panel)
export const updatePage = catchAsync(async (req, res, next) => {
  const updatedPage = await LocationPage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedPage) return next(new AppError('Page not found', 404));
  
  // 🌟 CLEAR CACHE AFTER UPDATING
  clearCache(`/${updatedPage.citySlug}/${updatedPage.serviceSlug}`); 
  
  successResponse(res, 200, 'Content updated successfully', { page: updatedPage });
});

// DELETE (For Admin Panel)
export const deletePage = catchAsync(async (req, res, next) => {
  const page = await LocationPage.findByIdAndDelete(req.params.id);
  if (!page) return next(new AppError('Page not found', 404));
  
  // 🌟 CLEAR CACHE AFTER DELETING
  clearCache(`/${page.citySlug}/${page.serviceSlug}`);
  
  successResponse(res, 200, 'SEO Page deleted permanently', null);
});