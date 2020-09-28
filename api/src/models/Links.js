const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('links', {
    name: {
       type: DataTypes.STRING,
       allowNull: false
    },
    links: {
      type: DataTypes.STRING,
      allowNull: false
   },
   module: {
    type: DataTypes.STRING,
    allowNull: false
 }
  });
}