const { isValidObjectId } = require('mongoose');

const Product = require('../../db/models/product.model');

const hasProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Введены не корректные данные' });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найдена' });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
};

module.exports = { hasProduct };
