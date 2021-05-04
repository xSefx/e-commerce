const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../db/models/user.model');
const { isUniqueEmail } = require('../middleware/isValid/userValid');

const saltRound = 5;

router
  .route('/register')
  .get((req, res) => {
    res.render('auth/register');
  })
  .post(isUniqueEmail, async (req, res) => {
    const { email, name, password } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRound);

    try {
      const user = await User.create({ name, email, password: hashPassword });
      req.session.UserID = user._id;
      req.session.userName = user.name;
      req.session.role = user.role;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: 'Ошибка при регистрации. Пожалуйста попробуйте позже.',
      });
    }
  });

router
  .route('/login')
  .get((req, res) => {
    res.render('auth/login');
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Неверный логин или пароль' });
      }

      const compareRes = await bcrypt.compare(password, user.password);

      if (!compareRes) {
        return res.status(400).json({ message: 'Неверный логин или пароль' });
      }

      req.session.UserID = user._id;
      req.session.userName = user.name;
      req.session.role = user.role;

      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({
        message: 'Ошибка авториризации. Пожалуйста попробуйте позже.',
      });
    }
  });

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.redirect('/');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);

    const user = await User.find();
    res.render('userList/userList', { user, layout: false });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const userBan = await User.findById(id);
    userBan.blocked = true;
    await userBan.save();

    const user = await User.find();
    res.render('userList/userList', { user, layout: false });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Произошла ошибка, попробуйте повторить позже.',
    });
  }
});

module.exports = router;
