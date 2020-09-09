const { DataTypes } = require('sequelize');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const instructor = sequelize.define('instructor', {

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            },
          },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              is: {
                args: ["[A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9]"],
                msg: 'Campo password - Debe ser un conjuto de caracteres, donde cada uno consiste de una letra mayúscula o minúscula, o un dígito. La contraseña debe empezar con una letra y contener al menor un dígito'
              }
            }
          },


        rol: {
            type: DataTypes.ENUM,
            values: ["admin", "user"],
            defaultValue: "admin",
          }
     
 


     });
     instructor.addHook('beforeCreate', (i) => {
        i.password = bcrypt.hashSync(i.password, bcrypt.genSaltSync(8), null);
      });
}