const menuRepository = require('./menuRepository');

const getMenuItems = async () => {
  return menuRepository.findAllMenus();
};

module.exports = { getMenuItems };
