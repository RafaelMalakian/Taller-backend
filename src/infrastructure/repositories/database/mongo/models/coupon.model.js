const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  discountType: {
    type: String,
    required: true,
    enum: ['PERCENTAGE', 'FIXED']
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  expirationDate: {
    type: Date,
    required: true
  },
  minOrderAmount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);
