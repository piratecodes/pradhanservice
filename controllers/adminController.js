import Admin from '../models/Admin.js';
import Lead from '../models/Lead.js';
import City from '../models/City.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import fs from 'fs';
import path from 'path';

import sendEmail from '../utils/email.js';

// --- 0. GET CURRENT LOGGED-IN PROFILE ---
export const getMe = (req, res, next) => {
  successResponse(res, 200, 'Profile fetched successfully', { 
    user: req.user 
  });
};

// --- MIDDLEWARE: Set User ID for "Me" routes ---
export const setMeAsParam = (req, res, next) => {
  req.params.id = req.user._id; // _id ensures Mongoose finds it perfectly!
  next();
};

// --- MIDDLEWARE: Admin Dashboard Stats ---
export const getDashboardStats = catchAsync(async (req, res, next) => {
  const [totalLeads, newLeads, activeCities, totalStaff] = await Promise.all([
    Lead.countDocuments({ status: { $ne: 'Lost' } }),
    Lead.countDocuments({ status: 'New' }),
    City.countDocuments({ isActive: true }),
    Admin.countDocuments({ isActive: true })
  ]);

  successResponse(res, 200, 'Dashboard stats retrieved', {
    stats: {
      totalLeads,
      newLeads,
      activeCities,
      totalStaff
    }
  });
});

// --- 1. CREATE NEW STAFF MEMBER ---
export const createStaff = catchAsync(async (req, res, next) => {
  const newStaff = await Admin.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    role: req.body.role || 'sales-agent',
    designation: req.body.designation,
    bio: req.body.bio,
    profilePic: req.body.profilePic
  });

  const loginUrl = `${process.env.ADMIN_PANEL_URL}/login` || 'http://localhost:5173/login';

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #c5a059; margin: 0;">Pradhan Services</h1>
      </div>
      <h2 style="color: #112440;">Welcome to the Team!</h2>
      <p style="color: #4b5563; font-size: 16px;">Hi <strong>${newStaff.name}</strong>,</p>
      <p style="color: #4b5563; font-size: 16px;">Your administrator has set up a new <strong>${newStaff.role}</strong> account for you. You can now access the CRM and start managing leads.</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; color: #112440;"><strong>Your Login Credentials:</strong></p>
        <p style="margin: 0 0 5px 0; color: #4b5563;"><strong>Username:</strong> ${newStaff.username}</p>
        <p style="margin: 0; color: #4b5563;"><strong>Password:</strong> ${req.body.password}</p>
      </div>

      <p style="color: #ef4444; font-size: 14px; font-weight: bold;">* Please log in and change your password immediately.</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${loginUrl}" style="background-color: #112440; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Log In to Dashboard</a>
      </div>
    </div>
  `;

  try {
        console.log(`🚀 Attempting to send welcome email to: ${newStaff.email}`);
        await sendEmail({
        email: newStaff.email,
        subject: 'Welcome to Pradhan Services - Your Login Credentials',
        message: `Hi ${newStaff.name}, welcome to Pradhan Services! Your role is ${newStaff.role}. Your login email is ${newStaff.email} and your temporary password is: ${req.body.password}. Please log in at ${loginUrl} and change your password immediately.`,
        html: htmlMessage
        });
    } catch (error) {
        // If it fails, this log will tell us exactly WHY (e.g., "Invalid Login")
        console.log("⚠️ EMAIL FAILED:", error.message);
    }

    newStaff.password = undefined;
    successResponse(res, 201, 'Staff member created successfully', { staff: newStaff });
  });

// --- 2. GET ALL STAFF MEMBERS ---
export const getAllAdmins = catchAsync(async (req, res, next) => {
  const query = req.query.all ? {} : { isActive: true };
  const staffMembers = await Admin.find(query).select('-password -__v');

  successResponse(res, 200, 'Staff retrieved successfully', { 
    count: staffMembers.length,
    staff: staffMembers 
  });
});

// --- 3. GET SINGLE STAFF MEMBER ---
export const getAdminById = catchAsync(async (req, res, next) => {
  const staff = await Admin.findById(req.params.id).select('-password');

  if (!staff) {
    return next(new AppError('No staff member found with that ID', 404));
  }

  successResponse(res, 200, 'Staff profile retrieved', { staff });
});

// --- 4. UPDATE STAFF PROFILE (WITH BULLETPROOF IMAGE LOGIC) ---
export const updateStaff = catchAsync(async (req, res, next) => {
  // 1. HARD BLOCK: Security check for passwords
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is NOT for password updates.', 400));
  }

  // 2. SECURITY: Role protection
  if (req.body.role && req.user.role !== 'super-admin') {
    return next(new AppError('You do not have permission to change user roles.', 403));
  }

  // 3. TARGET ID
  const targetId = req.params.id || req.user._id;

  // 4. HANDLE FILE UPLOAD & DELETE OLD IMAGE
  if (req.file) {
    req.body.profilePic = req.file.filename;

    // Delete the old picture so we don't clutter the server!
    const oldUser = await Admin.findById(targetId);
    if (oldUser && oldUser.profilePic && !oldUser.profilePic.startsWith('http') && oldUser.profilePic !== 'default-avatar.png') {
      const oldImagePath = path.join(process.cwd(), 'public', 'uploads', oldUser.profilePic);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
  }

  // 5. FILTER BODY: Prevent unauthorized field updates
  const filteredBody = {};
  const allowedFields = ['name', 'email', 'phone', 'designation', 'bio', 'profilePic'];
  
  if (req.user.role === 'super-admin') {
    allowedFields.push('role', 'isActive');
  }

  Object.keys(req.body).forEach(el => {
    if (allowedFields.includes(el)) {
      filteredBody[el] = req.body[el];
    }
  });

  // 6. DATABASE UPDATE
  const updatedStaff = await Admin.findByIdAndUpdate(
    targetId, 
    filteredBody, 
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedStaff) {
    return next(new AppError('No staff member found with that ID', 404));
  }

  successResponse(res, 200, 'Staff profile updated successfully', { staff: updatedStaff });
});

// --- 5. DEACTIVATE STAFF (Soft Delete) ---
export const deactivateStaff = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user.id || req.params.id === req.user._id.toString()) {
    return next(new AppError('Action denied. You cannot delete your own account!', 403));
  }
  const staff = await Admin.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!staff) {
    return next(new AppError('No staff member found with that ID', 404));
  }

  successResponse(res, 200, 'Staff member deactivated.', null);
});

// --- 6. PERMANENTLY DELETE STAFF (Hard Delete) ---
export const deleteStaff = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user.id || req.params.id === req.user._id.toString()) {
    return next(new AppError('Action denied. You cannot delete your own account!', 403));
  }

  const staff = await Admin.findByIdAndDelete(req.params.id);

  if (!staff) {
    return next(new AppError('No staff member found with that ID', 404));
  }

  successResponse(res, 200, 'Staff member permanently deleted.', null);
});