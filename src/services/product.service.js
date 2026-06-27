const ProductRepository = require('../repositories/product.repository');
const CategoryRepository = require('../repositories/category.repository');

const ProductService = {
  getAll: async (categorySlug) => {
    // Si viene categoría por URL (?category=running)
    if (categorySlug) {
      const category = await CategoryRepository.findBySlug(categorySlug);

      if (!category) {
        return []; // o podés lanzar error si querés
      }

      return ProductRepository.findByCategory(category._id);
    }

    return ProductRepository.findAll();
  },

  getById: async (id) => {
    const product = await ProductRepository.findById(id);

    if (!product) {
      const err = new Error('Producto no encontrado');
      err.statusCode = 404;
      throw err;
    }

    return product;
  },

  create: async (data, userId) => {
    const category = await CategoryRepository.findById(data.category);

    if (!category) {
      const err = new Error('La categoría especificada no existe');
      err.statusCode = 400;
      throw err;
    }

    return ProductRepository.create({
      ...data,
      createdBy: userId,
    });
  },

  update: async (id, data) => {
    if (data.category) {
      const category = await CategoryRepository.findById(data.category);

      if (!category) {
        const err = new Error('La categoría especificada no existe');
        err.statusCode = 400;
        throw err;
      }
    }

    const product = await ProductRepository.updateById(id, data);

    if (!product) {
      const err = new Error('Producto no encontrado');
      err.statusCode = 404;
      throw err;
    }

    return product;
  },

  delete: async (id) => {
    const product = await ProductRepository.deleteById(id);

    if (!product) {
      const err = new Error('Producto no encontrado');
      err.statusCode = 404;
      throw err;
    }

    return { message: 'Producto eliminado correctamente' };
  },
};

module.exports = ProductService;