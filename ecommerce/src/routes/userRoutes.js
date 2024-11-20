const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// View cart
router.get('/cart', async (req, res) => {
  // Mocking cart as an example
  const cart = {
    products: [
      {
        product: { name: 'Sample Product', price: 100 },
        quantity: 2,
      },
    ],
    total_price: 200,
  };
  res.render('cart', { cart });
});

// Add product to cart
router.post('/cart/add', async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const product = await Product.findById(product_id);
    if (!product || product.stock < quantity) {
      return res.status(400).send('Not enough stock');
    }
    // Mock: Add to cart logic
    res.redirect('/user/cart');
  } catch (err) {
    res.status(500).send('Error adding to cart');
  }
});

// Checkout
router.post('/cart/checkout', async (req, res) => {
  try {
    // Mock: Checkout logic
    res.send('Checkout successful');
  } catch (err) {
    res.status(500).send('Error during checkout');
  }
});

module.exports = router;
