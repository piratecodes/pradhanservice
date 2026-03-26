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