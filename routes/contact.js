const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');
const {
  validateContactMessage,
  handleValidationErrors
} = require('../middleware/validation');

// Public routes only - for client landing page
router.post('/send', validateContactMessage, handleValidationErrors, ContactController.sendMessage);

module.exports = router;
