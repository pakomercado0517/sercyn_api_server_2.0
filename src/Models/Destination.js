const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Destination", {
    name: {
      type: DataTypes.STRING,
      unique: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
  });
};
