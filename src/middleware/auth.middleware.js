const { verifyToken } = require('../utils/jwt');
const UserRepository = require('../repositories/user.repository');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await UserRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Cuenta no verificada. Revisá tu email.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol admin' });
  }
  next();
};

module.exports = { authenticate, requireAdmin };
