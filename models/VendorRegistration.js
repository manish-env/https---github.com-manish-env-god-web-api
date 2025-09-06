const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VendorRegistration = sequelize.define('VendorRegistration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'company_name'
  },
  companyWebsite: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'company_website'
  },
  personDesignation: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'person_designation'
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  file: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  directorName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'director_name'
  }
}, {
  tableName: 'vendor_registrations'
});

module.exports = VendorRegistration;
