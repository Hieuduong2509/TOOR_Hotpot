const express = require('express');
const bookingController = require('./bookingController');
const router = express.Router();

router.post('/', bookingController.createBooking);

module.exports = router;
