const { Op } = require('sequelize');
const Blog = require('../models/Blog');

class BlogController {
  // Get all blogs (optionally filter by published and tags, with pagination)
  static async getAllBlogs(req, res) {
    try {
      const {
        limit,
        offset = 0,
        published,
        tag,
        search
      } = req.query;

      const whereClause = {};

      if (typeof published !== 'undefined') {
        whereClause.published = String(published) === 'true';
      }

      if (tag) {
        whereClause.tags = { [Op.contains]: [tag] };
      }

      if (search) {
        const searchQuery = `%${search}%`;
        whereClause[Op.or] = [
          { title: { [Op.iLike]: searchQuery } },
          { content: { [Op.iLike]: searchQuery } },
          { author: { [Op.iLike]: searchQuery } }
        ];
      }

      const queryOptions = {
        where: whereClause,
        offset: parseInt(offset),
        order: [
          ['published', 'DESC'],
          ['publishedAt', 'DESC']
        ]
      };

      if (limit) {
        queryOptions.limit = parseInt(limit);
      }

      const blogs = await Blog.findAll(queryOptions);

      res.json({ success: true, data: blogs });
    } catch (error) {
      console.error('Get blogs error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // Get single blog by id or slug
  static async getBlog(req, res) {
    try {
      const { idOrSlug } = req.params;

      let blog;
      if (/^[0-9a-fA-F-]{36}$/.test(idOrSlug)) {
        blog = await Blog.findByPk(idOrSlug);
      } else {
        blog = await Blog.findOne({ where: { slug: idOrSlug } });
      }

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      res.json({ success: true, data: blog });
    } catch (error) {
      console.error('Get blog error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = BlogController;


