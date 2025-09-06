const Project = require('../models/Project');

class ProjectController {
  // Get all projects - Public API for client landing page
  static async getAllProjects(req, res) {
    try {
      const { limit, offset = 0, type } = req.query;
      
      const whereClause = type ? { type } : {};
      
      // If no limit specified, return all projects (like GenreOfDesign)
      const queryOptions = {
        where: whereClause,
        offset: parseInt(offset),
        order: [['priority', 'ASC']]
      };
      
      // Only add limit if specified
      if (limit) {
        queryOptions.limit = parseInt(limit);
      }
      
      const projects = await Project.findAll(queryOptions);

      res.json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error('Get projects error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get single project - Public API for client landing page
  static async getProject(req, res) {
    try {
      const { id } = req.params;
      
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      res.json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Get project error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get project types for filtering - Public API for client landing page
  static async getProjectTypes(req, res) {
    try {
      const types = await Project.findAll({
        attributes: ['type'],
        where: {
          type: {
            [require('sequelize').Op.ne]: null
          }
        },
        group: ['type'],
        raw: true
      });

      const uniqueTypes = types.map(item => item.type).filter(Boolean);

      res.json({
        success: true,
        data: uniqueTypes
      });
    } catch (error) {
      console.error('Get project types error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = ProjectController;
