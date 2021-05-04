const { isValidObjectId } = require('mongoose');

const Category = require('../../db/models/category.model');

const isUniqueCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    const category = await Category.findOne({ name });
    if (category) {
      return res
        .status(400)
        .json({ message: 'Категория с таким именем уже создана' });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
};

const hasCategory = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Введены не корректные данные' });
  }
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
};

module.exports = { isUniqueCategory, hasCategory };
