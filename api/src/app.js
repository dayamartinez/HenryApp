const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require ('passport');
const bcrypt = require('bcrypt')
var Strategy = require ('passport-local').Strategy;

//CORS IMPORTADO AL APP!
//const cors = require("cors");

const db = require('./db.js');

passport.use(new Strategy(
    function(username, password, done){
     
      //VERIFICA EL USER EN LA BASE DE DATOS
      db.Usuario.findOne({
        where:{
          email: username
         //   activo: true POR AHORA NOS TRAIGA TODOS!
        }
      })
      .then((user) => {
        //SI NO LO ENCUENTRA EN ESA BASE, CHEQUEA SI ES PARTE DEL STAFF
        if(!user){
          db.Staff.findOne({
            where:{
              email: username
            }
          })
          .then((staff) => {
            //SI NO ES PARTE DEL STAFF ENTONCES DEVUELVE ERROR
            if(!staff){
              return done(null,false);
            }
            //COMPARA LA PASSWORD CON EL HASH DE BCRYPT
            bcrypt.compare(password, staff.password, function(err, res) {
              if (res){
                return done(null, staff);
              } 
              else {
                return done(null, false)
              }
            })
          })
          .catch(err => {
            console.log(err)
            return done(err);
          })
        }
        //SI INGRESA UN ESTUDIANTE, ENTONCES COMPARA LA PASSWORD CON EL HASH DE BCRYPT
        if(user){
          bcrypt.compare(password, user.password, function(err, res) {
            if (res){
              return done(null, user);
            } else {
              return done(null, false)
            }
          })
        }
      })
      .catch(err => {
      console.log(err)
      return done(err);
      })
  }))
  
    passport.serializeUser(function(user, done){
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done){
    db.Usuario.findByPk(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        return done(err);
    })
    });


const server = express();

//SIN ESTA FUNCION EL SESSION NOSE LEVANTA!!!
server.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

server.name = 'API';

//server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//SE AGREGARON LOS METODOS PARA HACER REQUEST
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
next();
});

//SE CREA LA SESSION!
server.use(passport.initialize());
server.use(passport.session());

//COMENTADO SOLO MUESTRA DATOS EN EL BACK!!
// server.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
//   });
  

server.use('/', routes);

//ESTA FUNCION ES PARA INICIAR SESION!!
server.post('/login',
  passport.authenticate('local',{failureRedirect: '/login'}),
  function(req, res) {
    res.status(200).send(req.user);
  });


  //ESTA FUNCION ES PARA CERRAR SESION
  server.get('/logout', function(req, res){
    req.logOut();
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          next(err)
        } else {
          res.clearCookie('connect.sid')
          res.status(200).send("Deslogueado!")
          //res.redirect('/')
        }
      })
    }
  });



// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
const status = err.status || 500;
const message = err.message || err;
console.error(err);
res.status(status).send(message);
});

module.exports = server;
