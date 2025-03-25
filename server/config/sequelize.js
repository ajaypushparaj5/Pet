const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS || '',  // Fallback to empty string
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;