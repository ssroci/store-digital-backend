const CategoryService = require('../services/category.service');

const CategoryController = {
  getAll: async (req, res, next) => {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const category = await CategoryService.getById(req.params.id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const result = await CategoryService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CategoryController;
