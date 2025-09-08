const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

const createConnection = () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    return new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      pool: {
        max: 2,
        min: 0,
        acquire: 3000,
        idle: 1000
      },
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true
      }
    });
  } catch (error) {
    console.error('Error creating database connection:', error);
    return null;
  }
};

// Lazy initialize sequelize
const getSequelize = () => {
  if (!sequelize) {
    sequelize = createConnection();
  }
  return sequelize;
};

// Test database connection
const testConnection = async () => {
  const db = getSequelize();
  if (!db) {
    throw new Error('Failed to create database connection');
  }
  
  try {
    await db.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

// Initialize connection
sequelize = getSequelize();

module.exports = { 
  sequelize: getSequelize(),
  testConnection,
  getSequelize 
};
