const { body, param, query, validationResult } = require('express-validator');

// Auth validation
const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 4, max: 15 })
    .withMessage('Password must be between 4 and 15 characters'),
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters')
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateUpdateProfile = [
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
];

// Project validation
const validateCreateProject = [
  body('name')
    .notEmpty()
    .withMessage('Project name is required'),
  body('type')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Type must be at least 2 characters'),
  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters')
];

const validateUpdateProject = [
  param('id')
    .isUUID()
    .withMessage('Invalid project ID'),
  body('name')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Name cannot be empty'),
  body('type')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Type must be at least 2 characters')
];

// Job validation
const validateCreateJob = [
  body('title')
    .notEmpty()
    .withMessage('Job title is required'),
  body('description')
    .notEmpty()
    .withMessage('Job description is required'),
  body('experience')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Experience must be at least 2 characters'),
  body('qualification')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Qualification must be at least 2 characters'),
  body('skills')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Skills must be at least 2 characters')
];

const validateApplyJob = [
  body('jobPostingId')
    .isUUID()
    .withMessage('Invalid job posting ID'),
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('resume')
    .notEmpty()
    .withMessage('Resume is required')
];

// Contact validation
const validateContactMessage = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('message')
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number')
];

// Vendor validation
const validateVendorRegistration = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('companyName')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Company name must be at least 2 characters')
];

// Generic validation handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateCreateProject,
  validateUpdateProject,
  validateCreateJob,
  validateApplyJob,
  validateContactMessage,
  validateVendorRegistration,
  handleValidationErrors
};
