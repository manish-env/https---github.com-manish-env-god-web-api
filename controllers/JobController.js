const { validationResult } = require('express-validator');
const JobPosting = require('../models/JobPosting');
const Applicant = require('../models/Applicant');

class JobController {
  // Get all job postings - Public API for client landing page
  static async getAllJobs(req, res) {
    try {
      const jobs = await JobPosting.findAll({
        order: [['postedAt', 'DESC']]
      });

      res.json({
        success: true,
        data: jobs
      });
    } catch (error) {
      console.error('Get jobs error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get single job posting - Public API for client landing page
  static async getJob(req, res) {
    try {
      const { id } = req.params;
      
      const job = await JobPosting.findByPk(id);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job posting not found'
        });
      }

      res.json({
        success: true,
        data: job
      });
    } catch (error) {
      console.error('Get job error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Apply for job - Public API for client landing page
  static async applyForJob(req, res) {
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
        jobPostingId,
        name,
        email,
        phoneNumber,
        resume,
        yearsOfExperience,
        skills,
        expectedSalary,
        noticePeriod,
        marks10th,
        marks12th,
        graduation,
        coverLetter
      } = req.body;

      // Check if job posting exists
      const job = await JobPosting.findByPk(jobPostingId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job posting not found'
        });
      }

      const applicant = await Applicant.create({
        jobPostingId,
        name,
        email,
        phoneNumber,
        resume,
        yearsOfExperience,
        skills,
        expectedSalary,
        noticePeriod,
        marks10th,
        marks12th,
        graduation,
        coverLetter
      });

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        data: applicant
      });
    } catch (error) {
      console.error('Apply for job error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = JobController;
