const { Router } = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { authenticate } = require('../middleware/auth.middleware');

const router = Router();


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


router.get('/verify-email', AuthController.verifyEmail);


router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  validate,
  AuthController.login
);


router.get('/profile', authenticate, AuthController.getProfile);

module.exports = router;
