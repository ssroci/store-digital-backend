const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  previewImageUrl: {
    type: String,
    default: '',
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  sizes: {
    type: [String], 
    default: []
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  tags: [{ type: String, trim: true }],

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
