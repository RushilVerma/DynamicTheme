const Trend = require('../models/trendModel');

const fetchTrends = async (req, res) => {
  const trends = [
    { tag: 'Summer', type: 'season' },
    { tag: 'USA', type: 'country' },
    { tag: 'Christmas', type: 'festival' },
    { tag: 'English', type: 'language' }
  ];

  res.json(trends);
};

module.exports = { fetchTrends };
