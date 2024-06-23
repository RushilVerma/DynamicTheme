const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const contentRoutes = require('./routes/contentRoutes');
const trendRoutes = require('./routes/trendRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use('/api/content', contentRoutes);
app.use('/api/trends', trendRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
