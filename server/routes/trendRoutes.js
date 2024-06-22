const router = require('express').Router();
const { fetchTrends } = require('../controllers/trendController');

router.get('/', fetchTrends);

module.exports = router;
