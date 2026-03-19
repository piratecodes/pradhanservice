import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    // Phones
    primaryPhone: {
      type: String,
      required: [true, 'Primary phone number is required'],
      trim: true,
    },
    whatsappNumber: {
      type: String,
      trim: true,
    },
    alternatePhone: {
      type: String,
      trim: true,
    },

    // Emails
    supportEmail: {
      type: String,
      required: [true, 'Support email is required'],
      lowercase: true,
      trim: true,
    },
    salesEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    // Physical Location
    headOfficeAddress: {
      type: String,
      required: [true, 'Office address is required'],
      trim: true,
      // e.g., Your Bhawanipur address
    },
    googleMapsLink: {
      type: String,
      trim: true,
    },

    // Social Media (Optional, but good to have)
    facebookUrl: String,
    instagramUrl: String,
    twitterUrl: String,
    linkedinUrl: String,
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model('Contact', contactSchema);