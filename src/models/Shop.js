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
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

module.exports = mongoose.model('Shop', shopSchema);
