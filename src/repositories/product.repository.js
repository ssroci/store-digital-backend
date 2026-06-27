const Product = require('../models/Product');

const ProductRepository = {
  findAll: (filter = {}) =>
    Product.find({ isActive: true, ...filter })
      .populate('category', 'name slug')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 }),

  findById: (id) =>
    Product.findById(id)
      .populate('category', 'name slug')
      .populate('createdBy', 'name email'),

  create: (data) => Product.create(data),

  updateById: (id, data) =>
    Product.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate('category', 'name slug'),

  deleteById: (id) => Product.findByIdAndDelete(id),

  findByCategory: (categoryId) =>
    Product.find({ category: categoryId, isActive: true })
      .populate('category', 'name slug'),
};

module.exports = ProductRepository;
