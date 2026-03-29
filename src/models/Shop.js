const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, default: '' },
    },
  ],
});

module.exports = mongoose.model('Shop', shopSchema);
