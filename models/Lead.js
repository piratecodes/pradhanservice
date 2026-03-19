import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    // 7. Type of service (Placed first as requested!)
    serviceRequested: {
      type: String,
      required: [true, 'Service type is required'],
      index: true, // Speeds up filtering in your Admin Panel
    },
    
    // 1. Name *
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    
    // 2. Email *
    customerEmail: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    
    // 3. Phone No *
    customerPhone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    
    // 4. Origin City * (Where they are right now)
    originCity: {
      type: String,
      required: [true, 'Origin city or location is required'],
      trim: true,
    },
    
    // 5. Destination City (Kept optional so single-location services don't crash the API)
    destinationCity: {
      type: String,
      trim: true,
    },
    
    // 8. Date of Shifting
    shiftingDate: {
      type: Date,
    },
    
    // 9. Comment (For specific instructions or requirements)
    customerComment: {
      type: String,
      trim: true,
    },

    // 6. Sub Category (The Dynamic Bucket)
    // If they choose "Car Transport", this stores { "Vehicle Type": "Hatchback" }
    customFields: {
      type: Map,
      of: String,
    },

    // --- ADMIN DASHBOARD DATA (Invisible to the customer) ---
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quoted', 'Converted', 'Lost'],
      default: 'New',
    },
    adminNotes: {
      type: String,
    }
  },
  { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' dates
  }
);

export default mongoose.model('Lead', leadSchema);