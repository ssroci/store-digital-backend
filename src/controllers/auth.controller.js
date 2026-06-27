const AuthService = require('../services/auth.service');

const AuthController = {
  register: async (req, res, next) => {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { token } = req.query;
      const result = await AuthService.verifyEmail(token);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const user = await AuthService.getProfile(req.user._id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthController;
