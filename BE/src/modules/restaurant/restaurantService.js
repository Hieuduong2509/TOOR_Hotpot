const restaurantRepository = require('./restaurantRepository');

const getRestaurants = async () => {
  return restaurantRepository.findAllRestaurants();
};

module.exports = { getRestaurants };
