const restaurantService = require('./restaurantService');

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.getRestaurants();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRestaurants };
