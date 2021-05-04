const router = require('express').Router();

const User = require('../../db/models/user.model');

router.route('/userList').get(async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
});

module.exports = router;
