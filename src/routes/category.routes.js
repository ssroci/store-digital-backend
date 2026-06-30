const { Router } = require('express');
const { body } = require('express-validator');
const CategoryController = require('../controllers/category.controller');
const validate = require('../middleware/validate');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');

const router = Router();


router.get('/', CategoryController.getAll);


router.get('/:id', CategoryController.getById);


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


router.put(
  '/:id',
  authenticate,
  requireAdmin,
  CategoryController.update
);


router.delete('/:id', authenticate, requireAdmin, CategoryController.delete);

module.exports = router;
