import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    // 1. ALBUM DETAILS
    categoryName: {
      type: String,
      required: [true, 'An album must have a name (e.g., Office Relocation)'],
      trim: true,
      unique: true, // Prevents admins from creating two albums with the exact same name
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, 'Description should be short and sweet (max 500 characters)'],
    },
    
    // 2. STATUS TOGGLE
    isPublished: {
      type: Boolean,
      default: true, // Set to false if you want albums to save as Drafts by default
    },

    // 3. THE COVER PHOTO
    featuredImage: {
      url: { 
        type: String, 
        required: [true, 'A featured cover image is required'] 
      },
      alt: { 
        type: String, 
        trim: true,
        default: 'Gallery cover photo' 
      }
    },

    // 4. THE BULK IMAGES ARRAY
    images: [
      {
        url: { 
          type: String, 
          required: [true, 'Image URL is required'] 
        },
        alt: { 
          type: String, 
          trim: true,
          default: 'Gallery image' 
        }
      }
    ]
  },
  { 
    timestamps: true // Automatically gives you createdAt and updatedAt
  }
);

// 🌟 AUTO-SLUG GENERATOR
// Before saving to the database, this turns "Premium Car Transport!" into "premium-car-transport"
gallerySchema.pre('save', function (next) {
  if (this.isModified('categoryName')) {
    this.slug = this.categoryName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Removes special characters
      .replace(/[\s_-]+/g, '-') // Replaces spaces with hyphens
      .replace(/^-+|-+$/g, ''); // Removes leading/trailing hyphens
  }
  next();
});

export default mongoose.model('Gallery', gallerySchema);