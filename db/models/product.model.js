const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  image: [],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  create: {
    type: Date,
    default: Date.now(),
  },
  checked: {
    type: Boolean,
    default: false,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Product', productSchema);
