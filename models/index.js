const { sequelize } = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const JobPosting = require('./JobPosting');
const Applicant = require('./Applicant');
const ContactMessage = require('./ContactMessage');
const VendorRegistration = require('./VendorRegistration');
const Blog = require('./Blog');

// Define associations
JobPosting.hasMany(Applicant, {
  foreignKey: 'jobPostingId',
  as: 'applicants'
});

Applicant.belongsTo(JobPosting, {
  foreignKey: 'jobPostingId',
  as: 'jobPosting'
});

// Initialize database
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync models with database (force: false to preserve existing data)
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Project,
  JobPosting,
  Applicant,
  ContactMessage,
  VendorRegistration,
  Blog,
  initDatabase
};
