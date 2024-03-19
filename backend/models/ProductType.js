const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const ProductType = mongoose.model('ProductType', productTypeSchema);

module.exports = ProductType;
