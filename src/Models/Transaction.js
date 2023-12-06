const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Transaction", {
    passenger: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    preference_id: {
      type: DataTypes.STRING,
    },
  });
};
