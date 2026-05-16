const authRepository = require('./authRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const register = async (username, password, full_name, phone) => {
  const existingUser = await authRepository.findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }
  const password_hash = await bcrypt.hash(password, 10);
  const user = await authRepository.createUser(username, password_hash, full_name, phone);
  
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  return { user, token };
};

const login = async (username, password) => {
  const user = await authRepository.findUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }
  
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  const { password_hash, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

const getProfile = async (id) => {
  return await authRepository.findUserById(id);
};

module.exports = { register, login, getProfile };
