const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("BoatImage", {
    url: {
      type: DataTypes.STRING,
    },
  });
};
