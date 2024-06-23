const axios = require('axios');

const fetchTrends = async (req, res) => {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        api_key: process.env.SERP_API_KEY,
        q: 'trending topics',
        gl: 'in',
        hl: 'en',
      },
    });

    const trends = response.data.organic_results.map(result => ({
      tag: result.title,
      type: 'trend',
    }));

    res.json(trends);
  } catch (error) {
    console.error(`Error fetching trends:`, error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
};

module.exports = { fetchTrends };