const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Company", {
    companyName: {
      type: DataTypes.STRING,
      unique: false,
    },
    logo: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  });
};
