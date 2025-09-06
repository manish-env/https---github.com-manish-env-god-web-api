const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const {
  validateApplyJob,
  handleValidationErrors
} = require('../middleware/validation');

// Public routes only - for client landing page
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJob);
router.post('/apply', validateApplyJob, handleValidationErrors, JobController.applyForJob);

module.exports = router;
