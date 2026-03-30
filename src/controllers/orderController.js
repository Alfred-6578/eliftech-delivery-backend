const Order = require('../models/Order');
const Coupon = require('../models/Coupon');

exports.getOrders = async (req, res) => {
  try {
    const { email, phone } = req.query;
    if (!email || !phone) {
      return res.status(400).json({ message: 'Email and phone are required' });
    }
    const orders = await Order.find({ email, phone })
      .populate('shops.shop', 'name')
      .populate('shops.items.product', 'name price');
    res.json({ total: orders.length, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('shops.shop', 'name')
      .populate('shops.items.product', 'name price image');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { name, email, phone, address, shops, couponCode } = req.body;

    let totalPrice = shops.reduce((total, s) => {
      s.subtotal = s.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return total + s.subtotal;
    }, 0);

    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
      if (!coupon) return res.status(400).json({ message: 'Coupon not found' });
      if (!coupon.isActive) return res.status(400).json({ message: 'Coupon is inactive' });
      if (coupon.expiresAt < new Date()) return res.status(400).json({ message: 'Coupon has expired' });
      discount = coupon.discount;
      totalPrice = totalPrice - (totalPrice * discount) / 100;
    }

    const order = await Order.create({ name, email, phone, address, shops, totalPrice });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
