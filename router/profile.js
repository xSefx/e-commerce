const router = require('express').Router();

const Product = require('../db/models/product.model');
const Category = require('../db/models/category.model');
const User = require('../db/models/user.model');

router.get('/', async (req, res) => {
  const productList = await Product.find({ archive: false, checked: true });
  const categoryList = await Category.find();

  res.render('index', { productList, categoryList });
});

router.get('/profile', async (req, res) => {
  if (req.session.role !== 'Admin') {
    const productList = await Product.find({
      user: req.session.UserID,
    }).populate('category');

    return res.render('dashboard/user', { productList, layout: false });
  }
  const users = await User.find();
  const newUsers = await User.find().limit(5);
  const product = await Product.find({ checked: false });

  const allProduct = await Product.find({ archive: false });
  const noCheckProduct = await Product.find({ checked: false });

  return res.render('dashboard/admin', {
    userCount: users.length,
    layout: false,
    productCount: allProduct.length,
    noChecked: noCheckProduct.length,
    newUsers,
    product,
  });
});

module.exports = router;
