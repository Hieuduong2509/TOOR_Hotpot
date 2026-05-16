const express = require('express');
const menuController = require('./menuController');
const router = express.Router();

router.get('/', menuController.getMenu);

module.exports = router;
