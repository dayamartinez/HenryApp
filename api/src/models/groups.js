const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const group = sequelize.define('group', {

        
       name: {
           type: DataTypes.STRING,
           allowNull: false
       }



     });
}