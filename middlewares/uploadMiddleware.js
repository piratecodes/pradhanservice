import multer from 'multer';
import path from 'path';
import fs from 'fs';
import AppError from '../utils/AppError.js';

// 1. Ensure the upload directory exists
// This prevents Multer from crashing if the folder isn't there yet
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configure Storage Settings
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to public/uploads
  },
  filename: (req, file, cb) => {
    // Rename file to prevent overwriting: user-ID-timestamp.jpeg
    const ext = file.mimetype.split('/')[1];
    const uniqueName = `user-${req.user ? req.user.id : 'guest'}-${Date.now()}.${ext}`;
    cb(null, uniqueName);
  }
});

// 3. Configure File Filter (Images Only)
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

// 4. Initialize Multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit to save Hostinger storage
  }
});

// Export the specific upload types you need
export const uploadSingleImage = upload.single('photo'); // 'photo' is the field name Postman/Vite will use
export const uploadMultipleImages = upload.array('gallery', 10); // Max 10 images at once