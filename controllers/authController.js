import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // <-- Added for password reset
import Admin from '../models/Admin.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import sendEmail from '../utils/email.js'; // <-- Added for sending the reset email

// --- HELPER: Generate JWT ---
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 1. THE BOOTSTRAPPER (One-time setup for you)
export const setupFirstAdmin = catchAsync(async (req, res, next) => {
  const adminExists = await Admin.findOne();
  if (adminExists) {
    return next(new AppError('An admin already exists. Please log in.', 403));
  }

  const newAdmin = await Admin.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    role: 'super-admin',
    designation: 'Founder / CEO'
  });

  newAdmin.password = undefined;
  successResponse(res, 201, 'Super Admin created successfully!', { admin: newAdmin });
});

// 2. THE LOGIN SYSTEM
export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  const admin = await Admin.findOne({ username }).select('+password');

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  if (!admin.isActive) {
    return next(new AppError('This account has been deactivated. Contact the Super Admin.', 403));
  }

  const token = signToken(admin._id);
  admin.password = undefined;

  successResponse(res, 200, 'Logged in successfully', { token, admin });
});

// 3. THE GATEKEEPER
export const protect = catchAsync(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await Admin.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  if (!currentUser.isActive) {
    return next(new AppError('This user account is deactivated.', 401));
  }

  req.user = currentUser; 
  next();
});

// 4. THE BOUNCER
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

// 5. CHECK CURRENT USER
export const getMe = catchAsync(async (req, res, next) => {
  successResponse(res, 200, 'User is logged in', { admin: req.user });
});

// 👇 6. FORGOT PASSWORD (Generates Token & Sends Email) 👇
export const forgotPassword = catchAsync(async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  const resetToken = admin.createPasswordResetToken();
  await admin.save({ validateBeforeSave: false }); 

  const resetURL = `${process.env.ADMIN_PANEL_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
      <h2 style="color: #112440; text-align: center;">Password Reset Request</h2>
      <p style="color: #4b5563; font-size: 16px;">Hi <strong>${admin.name}</strong>,</p>
      <p style="color: #4b5563; font-size: 16px;">We received a request to reset your password for your Pradhan Services account. This link is valid for exactly <strong>10 minutes</strong>.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetURL}" style="background-color: #c5a059; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Your Password</a>
      </div>

      <p style="color: #6b7280; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
    </div>
  `;

  try {
    await sendEmail({
      email: admin.email,
      subject: 'Pradhan Services - Password Reset Token (Valid for 10 min)',
      message: `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}`,
      html: htmlMessage
    });

    successResponse(res, 200, 'Token sent to email!', null);
  } catch (error) {
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    await admin.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

// 👇 7. RESET PASSWORD (Accepts Token & Saves New Password) 👇
export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const admin = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!admin) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // Update password and clear the token
  admin.password = req.body.password;
  admin.passwordResetToken = undefined;
  admin.passwordResetExpires = undefined;
  await admin.save();

  // Instantly log them back in with their new password
  const token = signToken(admin._id);
  admin.password = undefined;

  successResponse(res, 200, 'Password reset successful. You are now logged in.', { token, admin });
});