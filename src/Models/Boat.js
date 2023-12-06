const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Boat", {
    name: {
      type: DataTypes.STRING,
      unique: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
  });
};
