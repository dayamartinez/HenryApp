const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const profile = sequelize.define('profile', {

        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              is: {
                args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
                msg: 'Campo name - Debe ser una palabra'
              }
            }
          },

        
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              is: {
                args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
                msg: 'Campo apellido - Debe ser una palabra'
              }
            }
          },
       
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        adress: {
            type: DataTypes.STRING,
            allowNull: false,
          },
       
       country: {
            type: DataTypes.STRING,
            allowNull: false,
         },

        about: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
     });
}