const { Sequelize, Op, Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const cohort = sequelize.define('cohort', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  });
}
