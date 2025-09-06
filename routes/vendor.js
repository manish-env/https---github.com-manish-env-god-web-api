const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/VendorController');
const {
  validateVendorRegistration,
  handleValidationErrors
} = require('../middleware/validation');

// Public routes only - for client landing page
router.post('/register', validateVendorRegistration, handleValidationErrors, VendorController.registerVendor);

module.exports = router;
