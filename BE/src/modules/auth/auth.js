const express = require('express');
const authController = require('./authController');
const authMiddleware = require('../../core/middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
