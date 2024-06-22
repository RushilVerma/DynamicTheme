const Trend = require('../models/trendModel');
const axios = require('axios');

const fetchTrends = async (req, res) => {
  // Dummy implementation: Replace this with actual trend fetching logic
  const trends = await Trend.find();
  res.json(trends);
};

module.exports = { fetchTrends };
