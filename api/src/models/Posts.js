const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('post', {
    comments: {
       type: DataTypes.TEXT,
       allowNull: false
    }, 
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    }
  });
}
