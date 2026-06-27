const { Router } = require('express');
const { body, param } = require('express-validator');

const ProductController = require('../controllers/product.controller');
const validate = require('../middleware/validate');
const { authenticate } = require('../middleware/auth.middleware');

const router = Router();

/**
 * GET /api/products
 * Público (opcional ?category=<id>)
 */
router.get('/', ProductController.getAll);

/**
 * GET /api/products/:id
 * Público + validación de MongoID
 */
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID inválido'),
  ],
  validate,
  ProductController.getById
);

/**
 * POST /api/products
 * Requiere JWT
 */
router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    body('fileUrl').isURL().withMessage('fileUrl debe ser una URL válida'),
    body('category').isMongoId().withMessage('category debe ser un ID de MongoDB válido'),
  ],
  validate,
  ProductController.create
);

/**
 * PUT /api/products/:id
 * Requiere JWT + validaciones opcionales
 */
router.put(
  '/:id',
  authenticate,
  [
    param('id').isMongoId().withMessage('ID inválido'),

    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('price').optional().isFloat({ min: 0 }),
    body('fileUrl').optional().isURL(),
    body('category').optional().isMongoId(),
  ],
  validate,
  ProductController.update
);

/**
 * DELETE /api/products/:id
 * Requiere JWT + validación ID
 */
router.delete(
  '/:id',
  authenticate,
  [
    param('id').isMongoId().withMessage('ID inválido'),
  ],
  validate,
  ProductController.delete
);

module.exports = router;