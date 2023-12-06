const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("PaymentsCollection", {
    preference_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    merchant_order_id: {
      type: DataTypes.STRING,
    },
    payment_id: {
      type: DataTypes.STRING,
    },
    payment_type: {
      type: DataTypes.STRING,
    },
    site_id: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });
};
