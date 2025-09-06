const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Applicant = sequelize.define('Applicant', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  jobPostingId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'job_posting_id',
    references: {
      model: 'job_postings',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'phone_number'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  resume: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  yearsOfExperience: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'years_of_experience'
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  expectedSalary: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'expected_salary'
  },
  noticePeriod: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'notice_period'
  },
  marks10th: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'marks_10th'
  },
  graduation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  marks12th: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'marks_12th'
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'cover_letter'
  }
}, {
  tableName: 'applicants'
});

module.exports = Applicant;
