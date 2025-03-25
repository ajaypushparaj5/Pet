const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pawfinds", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;