const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Content', contentSchema);
