const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  tag: String,
  type: String // e.g., season, country, festival, language
});

module.exports = mongoose.model('Trend', trendSchema);
