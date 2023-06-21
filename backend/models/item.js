const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { data: Buffer, contentType: String }
  // Otros campos que desees para tu modelo
});

module.exports = mongoose.model('Item', itemSchema);
