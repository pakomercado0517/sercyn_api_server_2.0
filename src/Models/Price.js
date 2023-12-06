const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("Price", {
    price: {
      type: DataTypes.INTEGER,
      unique: false,
    },
  });
};
