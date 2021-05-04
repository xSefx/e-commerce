const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  role: {
    type: String,
    default: 'User',
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('User', userSchema);
