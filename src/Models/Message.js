const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Message", {
    text: {
      type: DataTypes.STRING,
    },
    sender: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    clientId: {
      type: DataTypes.INTEGER,
    },
    receiverEmail: {
      type: DataTypes.STRING,
    },
    readed: {
      type: DataTypes.BOOLEAN,
    },
  });
};
