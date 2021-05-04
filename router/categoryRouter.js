const router = require('express').Router();

const Category = require('../db/models/category.model');
const {
  isUniqueCategory,
  hasCategory,
} = require('../middleware/isValid/categoryValid');

router
  .route('/')
  .post(isUniqueCategory, async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      res.render('category/categoryListItem', { newCategory, layout: false });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка при добавлении, попробуйте повторить позже.',
      });
    }
  });

router
  .route('/:id')
  .get(hasCategory, async (req, res) => {
    const { id } = req.params;

    try {
      const category = await Category.findById(id);
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка, попробуйте повторить позже.',
      });
    }
  })
  .put(hasCategory, isUniqueCategory, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const category = await Category.findById(id);
      category.name = name;
      await category.save();
      const allCategory = await Category.find();
      res.render('category/category', { allCategory, layout: false });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка, попробуйте повторить позже.',
      });
    }
  })
  .delete(hasCategory, async (req, res) => {
    const { id } = req.params;

    try {
      await Category.findByIdAndDelete(id);
      const allCategory = await Category.find();
      res.render('category/category', { allCategory, layout: false });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Произошла ошибка, попробуйте повторить позже.',
      });
    }
  });

module.exports = router;
