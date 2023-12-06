const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Rating", {
    condition_qualification: {
      type: DataTypes.INTEGER,
    },
    destination_qualification: {
      type: DataTypes.INTEGER,
    },
    global_qualification: {
      type: DataTypes.INTEGER,
    },
    operator_qualification: {
      type: DataTypes.INTEGER,
    },
    stars: {
      type: DataTypes.DECIMAL(10, 2),
    },
    comment: {
      type: DataTypes.TEXT,
    },
  });
};
