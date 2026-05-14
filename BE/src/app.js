const express = require('express');
const cors = require('cors');
const menuRoutes = require('./modules/menu/menu');
const restaurantRoutes = require('./modules/restaurant/restaurants');
const bookingRoutes = require('./modules/booking/bookings');
const authRoutes = require('./modules/auth/auth');
const orderRoutes = require('./modules/order/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;
