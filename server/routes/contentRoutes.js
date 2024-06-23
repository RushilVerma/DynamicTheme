const router = require('express').Router();
const { upload, uploadImage, fetchImages, deleteImage } = require('../controllers/contentController');

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', fetchImages);
router.delete('/:id', deleteImage);

module.exports = router;
