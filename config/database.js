const { Sequelize } = require('sequelize');
// Ensure Vercel includes these runtime dialect deps
const pg = require('pg');
require('pg-hstore');
require('dotenv').config();

let sequelize;

const createConnection = () => {
	try {
		if (!process.env.DATABASE_URL) {
			// Do not throw here; allow serverless cold starts without DB
			return null;
		}

		return new Sequelize(process.env.DATABASE_URL, {
			dialect: 'postgres',
			dialectModule: pg,
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
		return false;
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

const database = { getSequelize, testConnection };
Object.defineProperty(database, 'sequelize', {
	get: () => getSequelize()
});

module.exports = database;
