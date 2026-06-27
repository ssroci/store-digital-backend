const ProductService = require('../services/product.service');

const ProductController = {
  getAll: async (req, res, next) => {
    try {
      const { category } = req.query;
      const products = await ProductService.getAll(category);
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const product = await ProductService.getById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const product = await ProductService.create(req.body, req.user._id);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const product = await ProductService.update(req.params.id, req.body);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const product = await ProductService.delete(req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ProductController;