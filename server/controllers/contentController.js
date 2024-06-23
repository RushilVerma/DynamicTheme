const Content = require('../models/contentModel');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImage = (req, res) => {
  const newImage = new Content({
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  });

  newImage.save()
    .then(() => res.json({ message: 'Image uploaded successfully' }))
    .catch(err => res.status(400).json('Error: ' + err));
};

const fetchImages = (req, res) => {
  Content.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json('Error: ' + err));
};

const deleteImage = (req, res) => {
  Content.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Image deleted successfully' }))
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = { upload, uploadImage, fetchImages, deleteImage };