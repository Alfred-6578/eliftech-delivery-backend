const Shop = require('../models/Shop');

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().select('-products');
    res.json({ total: shops.length, shops });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('products');
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createShop = async (req, res) => {
  try {
    const { name, image } = req.body;
    const shop = await Shop.create({ name, image });
    res.status(201).json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json({ message: 'Shop deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
