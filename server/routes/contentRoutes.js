const router = require('express').Router();
const { upload, uploadImage, fetchImage } = require('../controllers/contentController');

router.post('/upload', upload.single('image'), uploadImage);
router.get('/:id', fetchImage);

module.exports = router;
