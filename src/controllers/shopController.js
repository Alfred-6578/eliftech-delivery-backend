const Shop = require('../models/Shop');

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().select('-products');
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
