const { pool } = require('../../core/config/database');

const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

const createUser = async (username, password_hash, full_name, phone) => {
  const result = await pool.query(
    'INSERT INTO users (username, password_hash, full_name, phone) VALUES ($1, $2, $3, $4) RETURNING id, username, full_name, phone',
    [username, password_hash, full_name, phone]
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query('SELECT id, username, full_name, phone, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = { findUserByUsername, createUser, findUserById };
