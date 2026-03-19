import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this media'],
      trim: true,
      // e.g., "Safe Loading of Honda City"
    },
    mediaType: {
      type: String,
      enum: ['photo', 'video'],
      required: [true, 'Media must be either a photo or a video'],
    },
    mediaUrl: {
      type: String,
      required: [true, 'Please provide the URL of the image or video'],
    },
    category: {
      type: String,
      trim: true,
      // e.g., "car-and-bike-transport"
    },
    
    // --- THE MEDIA SEO ENGINE ---
    seo: {
      altText: {
        type: String,
        required: [true, 'Alt text is strictly required for SEO and accessibility'],
        trim: true,
        // e.g., "Pradhan Packers and Movers loading a white Honda City onto a transport truck"
      },
      caption: {
        type: String,
        trim: true,
        // Optional text to display directly under the image on the website
      }
    },

    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model('Gallery', gallerySchema);