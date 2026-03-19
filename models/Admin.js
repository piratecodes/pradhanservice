import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a full name'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email ID'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      trim: true,
    },
    dob: {
      type: Date,
    },
    profilePic: {
      type: String,
      default: 'default-avatar.png', 
    },
    bio: {
      type: String,
      trim: true,
      maxLength: [500, 'Bio cannot exceed 500 characters'],
    },
    designation: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'sales-agent'],
      default: 'sales-agent',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false, 
    },
    // 👇 NEW FORGOT PASSWORD FIELDS 👇
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { 
    timestamps: true 
  }
);

// --- SECURITY HOOK: Auto-Hash Password ---
adminSchema.pre('save', async function() {
  // 1. Only run this function if password was actually modified
  if (!this.isModified('password')) return;

  // 2. Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// --- UTILITY METHOD: Verify Password ---
adminSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// 👇 NEW UTILITY METHOD: Generate Reset Token 👇
adminSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

export default mongoose.model('Admin', adminSchema);