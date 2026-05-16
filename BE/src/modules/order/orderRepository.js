const { pool } = require('../../core/config/database');

const createOrder = async (userId, items, totalPrice) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query(
      'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id, user_id, total_price, status, created_at',
      [userId, totalPrice]
    );
    const orderId = orderResult.rows[0].id;

    for (let item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.menu_item_id, item.quantity, item.price]
      );
    }
    
    await client.query('COMMIT');
    return orderResult.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const findOrdersByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

const findOrderItemsByOrderId = async (orderId) => {
  const result = await pool.query(`
    SELECT oi.id, oi.menu_item_id, m.name, oi.quantity, oi.price 
    FROM order_items oi 
    JOIN menu_items m ON oi.menu_item_id = m.id 
    WHERE oi.order_id = $1`, [orderId]);
  return result.rows;
};

module.exports = { createOrder, findOrdersByUserId, findOrderItemsByOrderId };
