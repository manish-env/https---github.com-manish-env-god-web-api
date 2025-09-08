const express = require('express');
// Force bundling of pg deps for Sequelize in serverless
require('pg');
require('pg-hstore');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
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

let databaseInitialized = false;
let routesMounted = false;

async function ensureDatabase() {
  if (databaseInitialized) return;
  const db = getSequelize();
  if (!db) {
    throw new Error('Failed to create database connection');
  }
  try {
    await db.authenticate();
    databaseInitialized = true;
  } catch (err) {
    console.error('Database init error:', err);
    throw err;
  }
}

function mountRoutesOnce() {
  if (routesMounted) return;
  try {
    const projectRoutes = require('../routes/projects');
    const jobRoutes = require('../routes/jobs');
    const contactRoutes = require('../routes/contact');
    const vendorRoutes = require('../routes/vendor');
    const blogRoutes = require('../routes/blogs');

    app.use('/api/projects', projectRoutes);
    app.use('/api/jobs', jobRoutes);
    app.use('/api/contact', contactRoutes);
    app.use('/api/vendor', vendorRoutes);
    app.use('/api/blogs', blogRoutes);

    routesMounted = true;
  } catch (err) {
    console.error('Route mounting error:', err);
    throw err;
  }
}

// Export a handler that ensures DB is ready for DB-backed routes only
module.exports = async (req, res) => {
  try {
    // Skip DB init for health and root endpoints
    if (req.url === '/' || req.url.startsWith('/api/health')) {
      return app(req, res);
    }

    await ensureDatabase();
    mountRoutesOnce();
    return app(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    res.status(503).json({ success: false, message: 'Service unavailable' });
  }
};
