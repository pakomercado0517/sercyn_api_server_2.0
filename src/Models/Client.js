const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Client", {
    // id: {
    //   type: DataTypes.STRING,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    first_name: {
      type: DataTypes.STRING,
      unique: false,
    },
    last_name: {
      type: DataTypes.STRING,
      unique: false,
    },
    photo: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
