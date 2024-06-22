const router = require('express').Router();
const { generateThemeAssets, modifyText } = require('../controllers/mlController');

router.post('/generate-theme-assets', generateThemeAssets);
router.post('/modify-text', modifyText);

module.exports = router;
