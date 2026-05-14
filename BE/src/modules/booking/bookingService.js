const bookingRepository = require('./bookingRepository');

const createBooking = async (data) => {
  if (!data.restaurant_id || !data.date || !data.time || !data.guest_count || !data.name || !data.phone || !data.email || !data.agree_policy) {
    const error = new Error('Vui lòng điền đầy đủ thông tin và đồng ý với chính sách.');
    error.statusCode = 400;
    throw error;
  }

  return bookingRepository.insertBooking(data);
};

module.exports = { createBooking };
