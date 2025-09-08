const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { initDatabase } = require('../models');
const { getSequelize } = require('../config/database');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const projectRoutes = require('../routes/projects');
const jobRoutes = require('../routes/jobs');
const contactRoutes = require('../routes/contact');
const vendorRoutes = require('../routes/vendor');
const blogRoutes = require('../routes/blogs');

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/blogs', blogRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Genre of Design Public API Server',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Initialize database connection
const db = getSequelize();
if (!db) {
  throw new Error('Failed to initialize database connection');
}

// Export the Express API
module.exports = app;
