import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Gallery from '../models/Gallery.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';

// ==========================================================
// 1. THE "BUCKET" SETUP (MULTER MIDDLEWARE)
// ==========================================================

// Configure where and how the files are saved locally (for now)
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // This assumes you have a folder named 'public/uploads/gallery'
    cb(null, 'public/uploads/gallery'); 
  },
  filename: (req, file, cb) => {
    // Rename file to prevent overwriting: gallery-1623490123.jpeg
    const ext = file.mimetype.split('/')[1];
    cb(null, `gallery-${Date.now()}.${ext}`);
  }
});

// Security: Only allow image files to be uploaded
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

// We export this middleware so we can attach it to the route later
export const uploadGalleryPhoto = upload.single('mediaFile'); 


// ==========================================================
// 2. THE BUSINESS LOGIC (CONTROLLERS)
// ==========================================================

// --- ADMIN: CREATE GALLERY ITEM (Handles both Uploads & URLs) ---
export const createGalleryItem = catchAsync(async (req, res, next) => {
  let finalMediaUrl = req.body.mediaUrl;

  // DUAL APPROACH LOGIC:
  // If the admin uploaded a file, Multer processed it and attached it to req.file
  if (req.file) {
    // We create the local URL link. 
    // LATER: When you switch to an S3 bucket, you just put the S3 link here instead!
    finalMediaUrl = `/uploads/gallery/${req.file.filename}`;
  }

  // If there is no file uploaded AND no URL pasted, reject it.
  if (!finalMediaUrl) {
    return next(new AppError('Please provide either an image file or a video URL.', 400));
  }

  // Build the data object cleanly
  const galleryData = {
    title: req.body.title,
    mediaType: req.body.mediaType,
    mediaUrl: finalMediaUrl, // The magic variable we just determined
    category: req.body.category,
    seo: {
      altText: req.body['seo.altText'], // Parsing nested form-data
      caption: req.body['seo.caption']
    }
  };

  const newMedia = await Gallery.create(galleryData);

  successResponse(res, 201, 'Media added to gallery successfully', { media: newMedia });
});

// --- PUBLIC/ADMIN: GET ALL MEDIA ---
export const getAllMedia = catchAsync(async (req, res, next) => {
  // Allow the frontend to filter! e.g., ?mediaType=video or ?category=office-relocation
  let filter = { isActive: true };
  
  if (req.query.mediaType) filter.mediaType = req.query.mediaType;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.all) filter = {}; // Super admin can see inactive ones too

  const media = await Gallery.find(filter).sort({ createdAt: -1 }); // Newest first

  successResponse(res, 200, 'Gallery retrieved', { 
    count: media.length, 
    media 
  });
});

// --- ADMIN: UPDATE MEDIA (SEO / Titles) ---
export const updateMedia = catchAsync(async (req, res, next) => {
  // Usually, you don't update the actual file. You just update the text around it.
  // If they want to change the image, they should delete it and upload a new one.
  const updatedMedia = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedMedia) {
    return next(new AppError('No media found with that ID', 404));
  }

  successResponse(res, 200, 'Media details updated', { media: updatedMedia });
});

// --- ADMIN: DELETE MEDIA ---
export const deleteMedia = catchAsync(async (req, res, next) => {
  const media = await Gallery.findById(req.params.id);

  if (!media) {
    return next(new AppError('No media found with that ID', 404));
  }

  // 1. Delete the physical file if it exists locally
  if (media.mediaUrl && media.mediaUrl.startsWith('/uploads/')) {
    // Convert the URL route into a real server folder path
    const filePath = path.join(process.cwd(), 'public', media.mediaUrl);
    
    // Unlink (delete) the file from the hard drive
    fs.unlink(filePath, (err) => {
      if (err) console.error("Could not delete physical file:", err);
      else console.log("Physical file deleted successfully!");
    });
  }

  // 2. Delete the database record
  await media.deleteOne();

  successResponse(res, 200, 'Media and file deleted successfully', null);
});