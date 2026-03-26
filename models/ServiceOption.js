// models/ServiceOption.js
import mongoose from 'mongoose';

const serviceOptionSchema = new mongoose.Schema({
  categoryName: { 
    type: String, 
    required: [true, 'Must have a category name (e.g., 1BHK, SUV)'] 
  },
  // THE STATIC LINK: No more ObjectIds! Just your fixed business services.
  serviceType: {
    type: String,
    enum: [
      'packers-and-movers',
      'packers-and-movers',
      'storage-solutions',
      'car-transportation',
      'bike-transportation',
      // 'car-and-bike-transport',
      // 'office-relocation',
      // 'fine-art-movement',
      // 'transport-and-logistics',
      // 'factory-moving',
      // 'defence-relocation-service',
      // 'home-appliance-uninstall-and-install',
      // 'after-shifting-services'
    ],
    required: [true, 'An option must belong to a specific static service']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priceStartingFrom: Number,
  description: String,
  order: Number
}, {
  timestamps: true
});

const ServiceOption = mongoose.model('ServiceOption', serviceOptionSchema);
export default ServiceOption;