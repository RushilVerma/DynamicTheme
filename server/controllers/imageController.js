const Image = require('../models/imageModel'); // Correctly import the Image model
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config({ path: '../.env' });

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

const modifyImage = async (req, res) => {
  try {
    const { imageId, tags } = req.body;
    const imageDoc = await Image.findById(imageId);

    if (!imageDoc) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', imageDoc.filename);
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');

    const response = await openai.createImageEdit({
      image: imageBase64,
      prompt: `Modify this image based on the following tags: ${tags.join(', ')}`,
    });

    const modifiedImageUrl = response.data.data.url;

    res.json({ modifiedImageUrl });
  } catch (error) {
    console.error('Error modifying image:', error);
    res.status(500).json({ error: 'Failed to modify image' });
  }
};

module.exports = { modifyImage };