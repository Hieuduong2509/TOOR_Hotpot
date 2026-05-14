const authService = require('./authService');

const register = async (req, res, next) => {
  try {
    const { username, password, full_name, phone } = req.body;
    if (!username || !password || !full_name) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const result = await authService.register(username, password, full_name, phone);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error.message === 'Username already exists') {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing username or password' });
    }
    const result = await authService.login(username, password);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.message === 'Invalid username or password') {
      return res.status(401).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };
