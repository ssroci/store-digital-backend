const Category = require('../models/Category');

const CategoryRepository = {
  findAll: () => Category.find().sort({ name: 1 }),
  findById: (id) => Category.findById(id),
  findBySlug: (slug) => Category.findOne({ slug }),
  create: (data) => Category.create(data),
  updateById: (id, data) => Category.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteById: (id) => Category.findByIdAndDelete(id),
};

module.exports = CategoryRepository;
