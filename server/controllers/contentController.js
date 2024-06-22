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

const fetchImage = (req, res) => {
  Content.findById(req.params.id)
    .then(content => res.json(content))
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = { upload, uploadImage, fetchImage };