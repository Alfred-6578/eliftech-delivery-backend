const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  shops: [
    {
      shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
      items: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          name: String,
          price: Number,
          quantity: Number
        }
      ],
      subtotal: Number
    }
  ],
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
