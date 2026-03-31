import mongoose from 'mongoose';

// --- VALIDATION: Limit Sections to Max 10 ---
const limitSections = (val) => {
  return val.length <= 10;
};

const locationPageSchema = new mongoose.Schema(
  {
    // 1. THE IDENTIFIERS
    citySlug: {
      type: String,
      required: [true, 'City slug is required'],
      lowercase: true,
      trim: true,
    },
    serviceSlug: {
      type: String,
      required: [true, 'Service slug is required'],
      lowercase: true,
      trim: true,
    },

    // 2. THE SEO ENGINE
    seo: {
      metaTitle: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      metaKeywords: { type: String, trim: true },
      canonicalUrl: { type: String, trim: true },
      isNoIndex: { type: Boolean, default: false },
      jsonLdSchema: { type: String, trim: true },
    },

    // 3. THE MAIN HEADER
    header: {
      title: { type: String, trim: true }, 
      introText: { type: String, trim: true }, 
    },

    // 4. THE DYNAMIC SECTIONS (Max 10, Highly Stylable)
    sections: {
      type: [
        {
          // 4A. The "Top Tablet" (Badge)
          badge: {
            text: { type: String, trim: true }, // e.g., "Location Challenges"
            color: { 
              type: String, 
              enum: ['primary', 'secondary'], 
              default: 'secondary' // Defaults to Gold
            }
          },
          
          // 4B. The Heading
          heading: {
            text: { type: String, trim: true }, // e.g., "Best Packers and Movers in Kolkata"
            color: { 
              type: String, 
              enum: ['primary', 'secondary'], 
              default: 'primary' // Defaults to Navy
            }
          },
          // 4C. The Image (Optional)
          image: {
            url: { type: String, trim: true },
            alt: { type: String, trim: true }
          },
          
          // 4D. Description & Bullets
          description: { type: String, trim: true }, 
          bullets: [{ type: String, trim: true }], 
        }
      ],
      validate: [limitSections, 'A page cannot exceed 10 custom sections.']
    }
  },
  { 
    timestamps: true 
  }
);

// Prevent duplicate SEO pages for the exact same City + Service combination
locationPageSchema.index({ citySlug: 1, serviceSlug: 1 }, { unique: true });

export default mongoose.model('LocationPage', locationPageSchema);