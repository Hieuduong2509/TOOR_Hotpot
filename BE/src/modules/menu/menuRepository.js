const { pool } = require('../../core/config/database');

const findAllMenus = async () => {
  const result = await pool.query(
    `SELECT id, name, category, description, price, image_url FROM menu_items ORDER BY category, id`
  );
  return result.rows;
};

module.exports = { findAllMenus };
