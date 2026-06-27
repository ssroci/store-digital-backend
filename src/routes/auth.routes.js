const { Router } = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { authenticate } = require('../middleware/auth.middleware');

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  validate,
  AuthController.register
);

// GET /api/auth/verify-email?token=xxx
router.get('/verify-email', AuthController.verifyEmail);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  validate,
  AuthController.login
);

// GET /api/auth/profile  (requiere JWT)
router.get('/profile', authenticate, AuthController.getProfile);

module.exports = router;
