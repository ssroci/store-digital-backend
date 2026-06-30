const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const UserRepository = require('../repositories/user.repository');
const { generateToken } = require('../utils/jwt');
const { sendVerificationEmail } = require('../utils/email');

const AuthService = {
  
  register: async ({ name, email, password }) => {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      const err = new Error('Ya existe una cuenta con ese email');
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = uuidv4();

    const user = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await sendVerificationEmail(email, verificationToken);

    return { message: 'Registro exitoso. Revisá tu email para verificar tu cuenta.' };
  },

  
  verifyEmail: async (token) => {
    const user = await UserRepository.findByVerificationToken(token);
    if (!user) {
      const err = new Error('Token de verificación inválido o expirado');
      err.statusCode = 400;
      throw err;
    }

    user.isVerified = true;
    user.verificationToken = null;
    await UserRepository.save(user);

    return { message: 'Cuenta verificada correctamente. Ya podés iniciar sesión.' };
  },

  
  login: async ({ email, password }) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Credenciales inválidas');
      err.statusCode = 401;
      throw err;
    }

    if (!user.isVerified) {
      const err = new Error('Cuenta no verificada. Revisá tu email.');
      err.statusCode = 403;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error('Credenciales inválidas');
      err.statusCode = 401;
      throw err;
    }

    const token = generateToken({ id: user._id, role: user.role });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  
  getProfile: async (userId) => {
    const user = await UserRepository.findById(userId).select('-password -verificationToken');
    return user;
  },
};

module.exports = AuthService;
