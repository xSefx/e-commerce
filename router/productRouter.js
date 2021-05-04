const router = require('express').Router();

const Product = require('../db/models/product.model');
const Category = require('../db/models/category.model');
const { hasProduct } = require('../middleware/isValid/productValid');

router.get('/getProduct', async (req, res) => {
  const { categoryId } = req.query;

  const productList = await Product.find({
    category: categoryId,
    archive: false,
    checked: true,
  });
  res.render('product/categoryProduct', { productList, layout: false });
});

router.get('/allProduct', async (req, res) => {
  try {
    const productList = await Product.find({ archive: false, checked: true });
    const categoryList = await Category.find();

    res.render('index', { productList, categoryList });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
});

router
  .route('/addProduct')
  .get(async (req, res) => {
    const caterory = await Category.find();

    res.render('product/addProduct', { caterory });
  })
  .post(async (req, res) => {
    const {
      name, price, description, category, user,
    } = req.body;

    try {
      const newProduct = await Product.create({
        name,
        price,
        description,
        category,
        user,
      });
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка при добавлении, попробуйте повторить позже.',
      });
    }
  });

router
  .route('/:id')
  .get(hasProduct, async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка, попробуйте повторить позже.',
      });
    }
  })
  .put(hasProduct, async (req, res) => {
    const { id } = req.params;
    const {
      name, price, description, category,
    } = req.body;

    try {
      const product = await Product.findById(id);
      product.name = name;
      product.price = price;
      product.description = description;
      product.category = category;
      product.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка, попробуйте повторить позже.',
      });
    }
  })
  .delete(hasProduct, async (req, res) => {
    const { id } = req.params;

    try {
      await Product.findByIdAndDelete(id);

      const product = await Product.find().populate('user');
      res.render('product/productList', { product, layout: false });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка, попробуйте повторить позже.',
      });
    }
  })
  .patch(hasProduct, async (req, res) => {
    const { id } = req.params;

    try {
      const productChek = await Product.findById(id);
      productChek.checked = true;
      await productChek.save();

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
