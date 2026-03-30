require('dotenv').config();
const mongoose = require('mongoose');
const Shop = require('./models/Shop');
const Product = require('./models/Product');

const shopsData = [
  {
    name: 'McDonald\'s',
    image: 'https://logo.clearbit.com/mcdonalds.com',
    products: [
      { name: 'Big Mac', price: 4.99, image: '' },
      { name: 'McChicken', price: 3.49, image: '' },
      { name: 'French Fries', price: 2.49, image: '' },
      { name: 'Chicken Nuggets (6pc)', price: 3.99, image: '' },
    ],
  },
  {
    name: 'Pizza Planet',
    image: 'https://logo.clearbit.com/dominos.com',
    products: [
      { name: 'Margherita Pizza', price: 8.99, image: '' },
      { name: 'Pepperoni Pizza', price: 9.99, image: '' },
      { name: 'Hawaiian Pizza', price: 10.49, image: '' },
      { name: 'Garlic Bread', price: 3.49, image: '' },
    ],
  },
  {
    name: 'Sushi House',
    image: 'https://logo.clearbit.com/sushi.com',
    products: [
      { name: 'California Roll', price: 7.99, image: '' },
      { name: 'Salmon Nigiri (2pc)', price: 5.49, image: '' },
      { name: 'Miso Soup', price: 2.99, image: '' },
      { name: 'Dragon Roll', price: 11.99, image: '' },
    ],
  },
  {
    name: 'Taco Fiesta',
    image: 'https://logo.clearbit.com/tacobell.com',
    products: [
      { name: 'Beef Taco', price: 2.99, image: '' },
      { name: 'Chicken Burrito', price: 6.49, image: '' },
      { name: 'Nachos', price: 4.99, image: '' },
      { name: 'Quesadilla', price: 5.49, image: '' },
    ],
  },
  {
    name: 'Burger Barn',
    image: 'https://logo.clearbit.com/burgerking.com',
    products: [
      { name: 'Classic Burger', price: 5.99, image: '' },
      { name: 'Bacon Cheeseburger', price: 7.49, image: '' },
      { name: 'Onion Rings', price: 3.29, image: '' },
      { name: 'Milkshake', price: 4.49, image: '' },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Shop.deleteMany();
    await Product.deleteMany();

    for (const shopData of shopsData) {
      const shop = await Shop.create({ name: shopData.name, image: shopData.image });
      const products = await Product.insertMany(
        shopData.products.map((p) => ({ ...p, shop: shop._id }))
      );
      shop.products = products.map((p) => p._id);
      await shop.save();
    }

    console.log('Database seeded with dummy shops and products');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
