import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
    maxlength: [100, 'Food name cannot exceed 100 characters']
  },
  totalItems: {
    type: Number,
    required: [true, 'Total items is required'],
    min: [1, 'Total items must be at least 1']
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    min: [0, 'Cost cannot be negative']
  },
  posterName: {
    type: String,
    required: [true, 'Poster name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['available', 'claimed'],
    default: 'available'
  }
}, {
  timestamps: true
});

foodSchema.index({ status: 1, createdAt: -1 });
foodSchema.index({ foodName: 'text', description: 'text' });

export default mongoose.model('Food', foodSchema);