const mongoose = require('mongoose');

const path = process.env.URLDB;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectDB = () => mongoose.connect(path, options, () => {
  console.log('Connect to db');
});

module.exports = connectDB;
