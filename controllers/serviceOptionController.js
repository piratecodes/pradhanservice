import ServiceOption from '../models/ServiceOption.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import mongoose from 'mongoose';

// --- 1. ADD NEW DROPDOWN CATEGORY ---
export const createOption = catchAsync(async (req, res, next) => {
  const newOption = await ServiceOption.create(req.body);
  successResponse(res, 201, 'Service option category created successfully', { option: newOption });
});

// --- 2. GET ALL OPTIONS FOR A SPECIFIC SERVICE ---
export const getAllOptions = catchAsync(async (req, res, next) => {
  // If the dashboard asks for a specific service, filter it. Otherwise, return everything.
  let filter = {};
  if (req.query.serviceType) {
    filter.serviceType = req.query.serviceType;
  }

  // Sort by service type, then by your custom order number
  const options = await ServiceOption.find(filter).sort({ serviceType: 1, order: 1 });

  successResponse(res, 200, 'All service options retrieved', { 
    count: options.length,
    options 
  });
});
// (Next.js calls this! E.g., GET /api/service-options/car-and-bike-transport)
export const getOptionsByService = catchAsync(async (req, res, next) => {
  const options = await ServiceOption.find({ 
    serviceType: req.params.serviceSlug,
    isActive: true 
  });

  successResponse(res, 200, 'Dynamic form options retrieved', { 
    count: options.length,
    options 
  });
});

// --- 3. UPDATE DROPDOWN CATEGORY (Add/Remove Options) ---
export const updateOption = catchAsync(async (req, res, next) => {
  const updatedOption = await ServiceOption.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedOption) {
    return next(new AppError('No service option found with that ID', 404));
  }

  successResponse(res, 200, 'Service option updated successfully', { option: updatedOption });
});

// --- 4. TOGGLE ACTIVE STATUS ---
export const toggleOptionStatus = catchAsync(async (req, res, next) => {
  const option = await ServiceOption.findById(req.params.id);
  
  if (!option) {
    return next(new AppError('No service option found with that ID', 404));
  }

  option.isActive = !option.isActive;
  await option.save();

  successResponse(res, 200, `Service option is now ${option.isActive ? 'Active' : 'Inactive'}`, { option });
});

// --- 5. ADMIN: PERMANENTLY DELETE DROPDOWN CATEGORY ---
export const deleteOption = catchAsync(async (req, res, next) => {
  const option = await ServiceOption.findByIdAndDelete(req.params.id);
  
  if (!option) {
    return next(new AppError('No service option found with that ID', 404));
  }

  successResponse(res, 200, 'Service option permanently deleted', null);
});