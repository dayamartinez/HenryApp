require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// const sequelize = new Sequelize('postgres://tfsxbtas:uaXZmlvgHKSf86pwTbBwBeDmUqEjlDUl@tuffi.db.elephantsql.com:5432/tfsxbtas', {
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henryapp`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Cohort, Usuario, Group, PP, Staff, PM } = sequelize.models;

// Aca vendrian las relaciones

Usuario.belongsTo(Group); //user * ---- 1 group
Group.hasMany(Usuario);

Usuario.belongsTo(Cohort); //user * ---- 1 cohort
Cohort.hasMany(Usuario);

Usuario.belongsTo(PP); //user * ---- 1 pp
PP.hasMany(Usuario);

Usuario.hasOne(PM); //user 1 --- 1 PM
PM.belongsTo(Usuario);

Cohort.hasMany(Group); //cohort 1 --- * group
Group.belongsTo(Cohort);

Group.hasMany(PM); //Group 1 --- * PM
PM.belongsTo(Group);

Cohort.hasMany(PM) //Cohort 1 --- * PM
PM.belongsTo(Cohort)

Staff.belongsToMany(Cohort, { through: "staff_cohort" });
Cohort.belongsToMany(Staff, { through: "staff_cohort" });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};
