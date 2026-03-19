import Contact from '../models/Contact.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';

// --- PUBLIC/ADMIN: GET MASTER CONTACT INFO ---
export const getContactInfo = catchAsync(async (req, res, next) => {
  // We just grab the very first document in the collection
  let contactInfo = await Contact.findOne();

  // If you haven't set it up yet, return an empty object so the frontend doesn't crash
  if (!contactInfo) {
    contactInfo = {}; 
  }

  successResponse(res, 200, 'Global contact info retrieved', { contact: contactInfo });
});

// --- ADMIN: UPDATE CONTACT INFO ---
export const updateContactInfo = catchAsync(async (req, res, next) => {
  // 1. Check if a contact document already exists
  let contactInfo = await Contact.findOne();

  if (contactInfo) {
    // 2. If it exists, update it!
    contactInfo = await Contact.findByIdAndUpdate(contactInfo._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    // 3. If it doesn't exist (first time setup), create it!
    contactInfo = await Contact.create(req.body);
  }

  successResponse(res, 200, 'Global contact info updated successfully', { contact: contactInfo });
});