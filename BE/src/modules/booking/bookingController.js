const bookingService = require('./bookingService');

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, data: booking, message: 'Đặt bàn thành công' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking };
