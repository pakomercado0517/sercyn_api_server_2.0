const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Conversation", {
    // members: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    // },
  });
};
