const { pool } = require('../../core/config/database');

const insertBooking = async ({ restaurant_id, date, time, guest_count, name, phone, email, note, agree_policy }) => {
  const result = await pool.query(
    `INSERT INTO bookings (restaurant_id, booking_date, booking_time, guest_count, customer_name, phone, email, note, agree_policy)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, restaurant_id, booking_date AS date, booking_time AS time, guest_count, customer_name AS name, phone, email, note, agree_policy, created_at`,
    [restaurant_id, date, time, guest_count, name, phone, email, note || '', agree_policy]
  );
  return result.rows[0];
};

module.exports = { insertBooking };
