const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const AdoptionRequest = sequelize.define("AdoptionRequest", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  petName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = AdoptionRequest;