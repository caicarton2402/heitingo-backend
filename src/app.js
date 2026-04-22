const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/video', require('./routes/videoRoutes'));
app.use('/api/talent', require('./routes/talentRoutes'));
app.use('/api/mall', require('./routes/mallRoutes'));

// Basic route for health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HEITINGO API is running' });
});

module.exports = app;
