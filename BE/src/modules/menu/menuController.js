const menuService = require('./menuService');

const getMenu = async (req, res, next) => {
  try {
    const menus = await menuService.getMenuItems();
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMenu };
