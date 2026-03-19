import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: [true, 'City name is required'],
      unique: true,
      trim: true,
    },
    citySlug: {
      type: String,
      required: [true, 'City slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    activeServices: [
      {
        type: String,
      }
    ],
    subTowns: [
      {
        type: String,
        trim: true,
      }
    ],
    
    // --- THE SEO ENGINE ---
    seo: {
      metaTitle: {
        type: String,
        trim: true,
        // e.g., "Top Packers and Movers in {City} | Pradhan Service"
      },
      metaDescription: {
        type: String,
        trim: true,
        // e.g., "Looking for safe and fast relocation in {City}? Get a free quote today..."
      },
      keywords: {
        type: String,
        trim: true,
        // e.g., "packers, movers, relocation, {City}"
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

export default mongoose.model('City', citySchema);