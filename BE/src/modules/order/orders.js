const express = require('express');
const orderController = require('./orderController');
const authMiddleware = require('../../core/middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', orderController.createOrder);
router.get('/', orderController.getMyOrders);

module.exports = router;
