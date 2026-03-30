require('dotenv').config();
const mongoose = require('mongoose');
const Shop = require('./models/Shop');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Coupon = require('./models/Coupon');

const shopsData = [
  {
    name: 'McDonald\'s',
    image: 'https://logo.clearbit.com/mcdonalds.com',
    rating: 4.2,
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
    rating: 4.7,
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
    rating: 3.8,
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
    rating: 2.5,
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
    rating: 3.3,
    products: [
      { name: 'Classic Burger', price: 5.99, image: '' },
      { name: 'Bacon Cheeseburger', price: 7.49, image: '' },
      { name: 'Onion Rings', price: 3.29, image: '' },
      { name: 'Milkshake', price: 4.49, image: '' },
    ],
  },
];

const couponsData = [
  { code: 'SAVE10', discount: 10, expiresAt: new Date('2027-01-01') },
  { code: 'SAVE20', discount: 20, expiresAt: new Date('2027-01-01') },
  { code: 'HALFOFF', discount: 50, expiresAt: new Date('2027-06-01') },
  { code: 'EXPIRED5', discount: 5, isActive: false, expiresAt: new Date('2025-01-01') },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Shop.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Coupon.deleteMany();

    // Seed shops and products
    const createdShops = [];
    const createdProducts = [];

    for (const shopData of shopsData) {
      const shop = await Shop.create({ name: shopData.name, image: shopData.image, rating: shopData.rating });
      const products = await Product.insertMany(
        shopData.products.map((p) => ({ ...p, shop: shop._id }))
      );
      shop.products = products.map((p) => p._id);
      await shop.save();
      createdShops.push(shop);
      createdProducts.push(...products);
    }

    // Seed coupons
    await Coupon.insertMany(couponsData);

    // Seed sample orders
    await Order.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        shops: [
          {
            shop: createdShops[0]._id,
            items: [
              { product: createdProducts[0]._id, name: 'Big Mac', price: 4.99, quantity: 2 },
              { product: createdProducts[2]._id, name: 'French Fries', price: 2.49, quantity: 1 },
            ],
            subtotal: 4.99 * 2 + 2.49,
          },
        ],
        totalPrice: 4.99 * 2 + 2.49,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        address: '456 Oak Ave',
        shops: [
          {
            shop: createdShops[1]._id,
            items: [
              { product: createdProducts[4]._id, name: 'Margherita Pizza', price: 8.99, quantity: 1 },
              { product: createdProducts[5]._id, name: 'Pepperoni Pizza', price: 9.99, quantity: 3 },
            ],
            subtotal: 8.99 + 9.99 * 3,
          },
          {
            shop: createdShops[0]._id,
            items: [
              { product: createdProducts[1]._id, name: 'McChicken', price: 3.49, quantity: 2 },
            ],
            subtotal: 3.49 * 2,
          },
        ],
        totalPrice: 8.99 + 9.99 * 3 + 3.49 * 2,
      },
    ]);

    console.log('Database seeded: shops, products, orders, and coupons');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
