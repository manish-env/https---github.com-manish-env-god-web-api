const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController');

// Public routes only - for client landing page
router.get('/', BlogController.getAllBlogs);
router.get('/:idOrSlug', BlogController.getBlog);

module.exports = router;



