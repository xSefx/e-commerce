const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

// devDep
const morgan = require('morgan');

const connectDB = require('./db/connect');
const { hasAdmin } = require('./middleware/checkSessions/checkSessions');

// Импортируем роутеры
const productRouter = require('./router/productRouter');
const categoryRouter = require('./router/categoryRouter');
const authRouter = require('./router/authRouter');
const profileRouter = require('./router/profile');
// Админ
const userRouter = require('./router/admin/user');
const dashboardRouter = require('./router/dashboardRouter');

const { PORT, SECRET_SESSION_KEY, URLDB } = process.env;

const app = express();

app.set('view engine', 'hbs');

app.use(cors());
app.options('*', cors());

// Подключаем middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(
  session({
    key: 'sid',
    secret: SECRET_SESSION_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000000 },
    store: MongoStore.create({ mongoUrl: URLDB }),
  }),
);

app.use((req, res, next) => {
  res.locals.login = req.session.UserID;
  res.locals.userName = req.session.userName;
  next();
});

app.get('/admin', (req, res) => {
  res.render('dashboard/admin', { layout: false });
});

app.use('/auth', authRouter);
app.use('/', profileRouter);

// Для тех у кого есть регистрация
app.use('/product', productRouter);

// Роуты только для админа
app.use(hasAdmin);
app.use('/category', categoryRouter);
app.use('/admin', userRouter);
app.use('/admin', dashboardRouter);

connectDB();
app.listen(3000, () => {
  console.log(`Server run port ${PORT}`);
});
