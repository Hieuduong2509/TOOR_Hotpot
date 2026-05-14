const orderService = require('./orderService');

const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order items cannot be empty' });
    }
    const order = await orderService.placeOrder(req.user.id, items);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders };
