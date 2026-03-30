const Coupon = require('../models/Coupon');

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json({ total: coupons.length, coupons });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    if (!coupon.isActive) return res.status(400).json({ message: 'Coupon is inactive' });
    if (coupon.expiresAt < new Date()) return res.status(400).json({ message: 'Coupon has expired' });
    res.json({ discount: coupon.discount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;
    const coupon = await Coupon.create({ code, discount, expiresAt });
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
