const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const JobPosting = sequelize.define('JobPosting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'posted_at',
    defaultValue: DataTypes.NOW
  },
  qualification: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'job_postings'
});

module.exports = JobPosting;
