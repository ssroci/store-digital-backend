const CategoryRepository = require('../repositories/category.repository');

const CategoryService = {
  getAll: () => CategoryRepository.findAll(),

  getById: async (id) => {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      const err = new Error('Categoría no encontrada');
      err.statusCode = 404;
      throw err;
    }
    return category;
  },

  create: async (data) => {
    const category = await CategoryRepository.create(data);
    return category;
  },

  update: async (id, data) => {
    const category = await CategoryRepository.updateById(id, data);
    if (!category) {
      const err = new Error('Categoría no encontrada');
      err.statusCode = 404;
      throw err;
    }
    return category;
  },

  delete: async (id) => {
    const category = await CategoryRepository.deleteById(id);
    if (!category) {
      const err = new Error('Categoría no encontrada');
      err.statusCode = 404;
      throw err;
    }
    return { message: 'Categoría eliminada correctamente' };
  },
};

module.exports = CategoryService;
