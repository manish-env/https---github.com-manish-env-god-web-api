const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

// Public routes only - for client landing page
router.get('/', ProjectController.getAllProjects);
router.get('/types', ProjectController.getProjectTypes);
router.get('/:id', ProjectController.getProject);
router.get('/single/:id', ProjectController.getProject); // Alternative route for single project

module.exports = router;
