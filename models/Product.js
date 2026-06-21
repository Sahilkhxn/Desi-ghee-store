const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  shortDescription: String,
  category: {
    type: String,
    required: true,
    enum: ['cow-ghee', 'buffalo-ghee', 'desi-cow-ghee', 'flavored-ghee', 'combo-pack']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountedPrice: {
    type: Number,
    default: null
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  weight: {
    type: String,  // e.g. "500g", "1kg"
    required: true
  },
  images: [{
    url: { type: String, required: true },
    alt: String
  }],
  benefits: [String],
  ingredients: [String],
  nutritionFacts: {
    calories: String,
    fat: String,
    protein: String,
    carbs: String
  },
  tags: [String],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Auto-generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
