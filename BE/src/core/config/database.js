const { Pool } = require('pg');

console.log('--- Database Config ---');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('User:', process.env.DB_USER);
console.log('-----------------------');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost', // Changed default to localhost for easier local dev
  database: process.env.DB_NAME || 'restaurant_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: Number(process.env.DB_PORT || 5432),
});

module.exports = { pool };
