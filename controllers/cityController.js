import City from '../models/City.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { clearCache } from '../middlewares/cacheMiddleware.js'; // 🌟 Cleaned up import

// --- ADMIN: CREATE A NEW CITY ---
export const createCity = catchAsync(async (req, res, next) => {
  const newCity = await City.create(req.body);
  
  clearCache('/cities'); // 🌟 Targeted clear instead of flushing the whole website
  
  successResponse(res, 201, 'City added successfully', { city: newCity });
});

// --- PUBLIC/ADMIN: GET ALL CITIES ---
export const getAllCities = catchAsync(async (req, res, next) => {
  // If Next.js asks for a specific service (e.g., ?service=packers-and-movers)
  let filter = req.query.all ? {} : { isActive: true };
  
  if (req.query.service) {
    // MongoDB trick: Search inside the array of activeServices
    filter.activeServices = req.query.service; 
  }

  const cities = await City.find(filter).sort({ cityName: 1 }); // Alphabetical sort

  successResponse(res, 200, 'Cities retrieved', { 
    count: cities.length, 
    cities 
  });
});

// --- PUBLIC: GET CITY BY SLUG (For Next.js SEO Pages) ---
export const getCityBySlug = catchAsync(async (req, res, next) => {
  const city = await City.findOne({ 
    citySlug: req.params.slug,
    isActive: true 
  }).lean();

  if (!city) {
    return next(new AppError('City not found or is currently inactive', 404));
  }

  successResponse(res, 200, 'City SEO data retrieved', { city });
});

// --- ADMIN: UPDATE CITY (Add services, update SEO) ---
export const updateCity = catchAsync(async (req, res, next) => {
  const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedCity) {
    return next(new AppError('No city found with that ID', 404));
  }

  clearCache('/cities'); // 🌟 Clear cache on update

  successResponse(res, 200, 'City updated successfully', { city: updatedCity });
});

// --- ADMIN: TOGGLE CITY STATUS ---
export const toggleCityStatus = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.params.id);
  
  if (!city) {
    return next(new AppError('No city found with that ID', 404));
  }

  city.isActive = !city.isActive;
  await city.save();

  clearCache('/cities'); // 🌟 Clear cache when toggling status

  successResponse(res, 200, `City is now ${city.isActive ? 'Active' : 'Inactive'}`, { city });
});

// --- ADMIN: PERMANENTLY DELETE A CITY ---
export const deleteCityBySlug = catchAsync(async (req, res, next) => {
  // We look for the slug provided in the URL params
  const city = await City.findOneAndDelete({ citySlug: req.params.slug });

  if (!city) {
    return next(new AppError('No city found with that slug', 404));
  }

  clearCache('/cities'); // 🌟 Targeted clear instead of flushing the whole website

  successResponse(res, 200, `City '${req.params.slug}' deleted successfully`, null);
});