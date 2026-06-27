const { Router } = require('express');
const { body } = require('express-validator');
const CategoryController = require('../controllers/category.controller');
const validate = require('../middleware/validate');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');

const router = Router();

// GET /api/categories  — público
router.get('/', CategoryController.getAll);

// GET /api/categories/:id  — público
router.get('/:id', CategoryController.getById);

// POST /api/categories  — requiere auth (admin)
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
  ],
  validate,
  CategoryController.create
);

// PUT /api/categories/:id  — requiere auth (admin)
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  CategoryController.update
);

// DELETE /api/categories/:id  — requiere auth (admin)
router.delete('/:id', authenticate, requireAdmin, CategoryController.delete);

module.exports = router;
