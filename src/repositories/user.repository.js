const User = require('../models/User');

const UserRepository = {
  findById: (id) => User.findById(id),
  findByEmail: (email) => User.findOne({ email }),
  findByVerificationToken: (token) => User.findOne({ verificationToken: token }),
  create: (data) => User.create(data),
  save: (user) => user.save(),
};

module.exports = UserRepository;
