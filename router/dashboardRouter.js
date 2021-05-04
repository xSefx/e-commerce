const router = require('express').Router();

const Category = require('../db/models/category.model');
const User = require('../db/models/user.model');
const Product = require('../db/models/product.model');

router.get('/getCategoty', async (req, res) => {
  try {
    const allCategory = await Category.find();
    res.render('category/category', { allCategory, layout: false });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
});

router.get('/getUser', async (req, res) => {
  try {
    const user = await User.find();
    res.render('userList/userList', { user, layout: false });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
});

router.get('/getProduct', async (req, res) => {
  try {
    const product = await Product.find().populate('user');
    res.render('product/productList', { product, layout: false });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
});

module.exports = router;
