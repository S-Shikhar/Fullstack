const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const product = new Product({ name, description, price, stock });
    await product.save();
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.status(500).send('Error adding product');
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render('products', { products });
};
