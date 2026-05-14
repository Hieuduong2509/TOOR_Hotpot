const express = require('express');
const restaurantController = require('./restaurantController');
const router = express.Router();

router.get('/', restaurantController.getRestaurants);

module.exports = router;
