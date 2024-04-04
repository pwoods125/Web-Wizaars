const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {}

Profile.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usernamepsn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usernamexbox: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usernamesteam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usernamenintendo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
  },
);

module.exports = Profile;
