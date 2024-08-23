const router = require('express').Router();
const { modifyImage } = require('../controllers/imageController');

router.post('/modify', modifyImage);

module.exports = router;
