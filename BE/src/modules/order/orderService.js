const orderRepository = require('./orderRepository');

const placeOrder = async (userId, items) => {
  // calculate total price from items
  let totalPrice = 0;
  items.forEach(item => {
    totalPrice += item.price * item.quantity;
  });
  return await orderRepository.createOrder(userId, items, totalPrice);
};

const getUserOrders = async (userId) => {
  const orders = await orderRepository.findOrdersByUserId(userId);
  for (let order of orders) {
    order.items = await orderRepository.findOrderItemsByOrderId(order.id);
  }
  return orders;
};

module.exports = { placeOrder, getUserOrders };
