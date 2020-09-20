const { Sequelize, Op, Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pp');
}
