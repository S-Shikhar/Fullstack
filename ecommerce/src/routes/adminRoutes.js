const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const router = express.Router();

router.get('/dashboard', (req, res) => res.render('admin/dashboard'));
router.get('/products', getProducts);
router.post('/add-product', addProduct);

module.exports = router;
