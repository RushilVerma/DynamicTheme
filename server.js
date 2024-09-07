require('dotenv').config(); // Load environment variables

const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI  = require('openai');

const port = process.env.SERVER_PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/trendingDB';
const configuration = {
    apiKey: process.env.OPENAI_API_KEY
};

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Model for saving queries and traffic
const trendingSchema = new mongoose.Schema({
    query: String,
    date: { type: Date, default: Date.now }, // Changed to Date type with default value
    traffic: Number,
    graphic: String
});

const TrendingData = mongoose.model('TrendingData', trendingSchema); // Define the model

const openai = new OpenAI(configuration);
const app = express();
app.use(cors());

// Route to fetch and store trending search data
app.get('/fetch-trending', async (req, res) => {
    try {
        const serpApiKey = process.env.SERP_API_KEY;
        if (!serpApiKey) {
            throw new Error('SERP API key is missing');
        }

        const serpApiUrl = `https://serpapi.com/search.json?engine=google_trends_trending_now&frequency=daily&geo=IN&hl=en&api_key=${serpApiKey}`;

        const response = await axios.get(serpApiUrl);

        if (!response.data || !response.data.daily_searches || !response.data.daily_searches[0]) {
            throw new Error('Unexpected response format from SerpAPI');
        }

        const trendingData = response.data.daily_searches[0].searches.map(search => ({
            query: search.query,
            traffic: search.traffic,
            graphic: ""
        }));

        // Save to DB using the model
        const savedData = await TrendingData.insertMany(trendingData);
        res.json({ message: 'Trending data saved successfully', data: savedData });
    } catch (error) {
        console.error('Error in /fetch-trending:', error);
        res.status(500).json({ error: error.message || 'Error fetching or saving data.' });
    }
});

// API to retrieve trending data from DB
app.get('/trending-data', async (req, res) => {
    try {
        const trendingData = await TrendingData.find({}).sort({ date: -1 }).limit(50); // Get latest 50 entries
        res.json(trendingData);
    } catch (error) {
        console.error('Error in /trending-data:', error);
        res.status(500).json({ error: 'Error retrieving data' });
    }
});

app.get('/generate-image', async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            throw new Error('Query parameter is required');
        }

        // Generate image with DALL·E
        const response = await openai.images.generate({
            prompt: query,
            n: 1,
            size: "256x256"
            // size: "1024x1024"
        });
        console.log(JSON.stringify(response))
        const imageUrl = response.data[0].url;

        // Find the trending data entry and update it with the generated image URL
        const updatedTrendingData = await TrendingData.findOneAndUpdate(
            { query }, // Find the document by query
            { graphic: imageUrl }, // Update the 'graphic' field with the image URL
            { new: true } // Return the updated document
        );

        console.log(updatedTrendingData);
        if (!updatedTrendingData) {
            throw new Error('Trending data not found');
        }

        res.json({ imageUrl });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Error generating or updating image' });
    }
});

// API route to get image URL for a query
app.get('/get-image', async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            throw new Error('Query parameter is required');
        }

        // Find the trending data entry and get the image URL
        const trendingData = await TrendingData.findOne({ query });

        if (!trendingData) {
            throw new Error('Trending data not found');
        }

        res.json({ imageUrl: trendingData.graphic });
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ error: error.message || 'Error retrieving image' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});