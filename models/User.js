const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    // Match GenreOfDesign table: text primary key
    type: DataTypes.STRING,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'hashed_password'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // Match GenreOfDesign table name exactly
  tableName: 'user'
});

module.exports = User;
