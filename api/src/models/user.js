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

        address: {
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
        },

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

          profile:{
            type: DataTypes.ENUM,
            values: ["student", "instructor", "pm", "founder"]
          },

          rol: {
            type: DataTypes.ENUM,
            values: ["user", "admin"],
            defaultValue: "user"
          }

        })

        //hashea password antes de crearla
        student.addHook('beforeCreate', (s) => {
          s.password = bcrypt.hashSync(s.password, bcrypt.genSaltSync(8), null);
        });

}
