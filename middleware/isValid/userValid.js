const User = require('../../db/models/user.model');

const isUniqueEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким Email уже создан.' });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
};

module.exports = { isUniqueEmail };
