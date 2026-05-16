const { pool } = require('../../core/config/database');

const findAllRestaurants = async () => {
  const result = await pool.query(
    `SELECT id, name, address, open_time, close_time, phone, image_url FROM restaurants ORDER BY id`
  );
  return result.rows;
};

module.exports = { findAllRestaurants };
