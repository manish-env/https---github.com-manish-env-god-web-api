const { validationResult } = require('express-validator');
const VendorRegistration = require('../models/VendorRegistration');
const path = require('path');
const fs = require('fs').promises;

class VendorController {
  // Register vendor - Public API for client landing page
  static async registerVendor(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const {
        name,
        email,
        phone,
        companyName,
        companyWebsite,
        personDesignation,
        options = [],
        comments,
        directorName
      } = req.body;

      let filePath = null;

      // Handle file upload
      if (req.files && req.files.file) {
        const file = req.files.file;
        const fileName = `${Date.now()}-${file.name}`;
        const uploadPath = path.join(__dirname, '../uploads/vendors', fileName);
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(uploadPath), { recursive: true });
        
        await file.mv(uploadPath);
        filePath = `/uploads/vendors/${fileName}`;
      }

      const vendor = await VendorRegistration.create({
        name,
        email,
        phone,
        companyName,
        companyWebsite,
        personDesignation,
        options,
        comments,
        file: filePath,
        directorName
      });

      res.status(201).json({
        success: true,
        message: 'Vendor registration submitted successfully',
        data: vendor
      });
    } catch (error) {
      console.error('Vendor registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = VendorController;
