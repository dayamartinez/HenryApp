const app = require('express').Router();
const { Sequelize } = require('sequelize');
const { Usuario, Cohort } = require('../db.js');
const {isAuthenticated,isAdmin} =require('./helpers')

//rutas para ver todos los usuarios, modificar un usuario, borrar un usuario

//se trae todos los usuarios
app.get('/users', (req,res,next) => {
    Usuario.findAll()
    .then( usuario => {
        res.status(200).send(usuario);
    })
})


//Busca un usuario por su ID
app.get('/users/:id',(req,res,next) => {
  Usuario.findByPk(req.params.id)
  .then(usuario => {
    if (!usuario) {
      res.status(404).send("No se encuentra el usuario");
    }
    else {
     res.status(200).json(usuario);
    }
  })
})


//modifica un usuario para tener funciones de administrador
app.put('/isAdmin/:id',isAuthenticated,isAdmin,(req,res,next) => {
   Usuario.findByPk(req.params.id)
  .then ( function(usuario){
    usuario.rol = "admin";
    usuario.save();
    res.status(201).send("Este usuario ahora es administrador")
  })
})

//borra un usuario (no lo borra de la base, sino que lo pasa a estado inactivo)
app.delete('/users/:id',isAuthenticated,isAdmin,(req,res,next)=>{
    Usuario.findByPk(req.params.id)
    .then(usuario => {
        if (!usuario){
            //sino lo encuentra devuelve un error
            return res.status(400).send("Usuario inexistente");
        } else {
            //al borrar un usuario, pasamos la propiedad activo a false.
            usuario.activo = false;
            user.save();
            return res.status(200).send("Usuario inactivo")
        }
    })
})

//Lista todos los cohortes y se trae todos los usuarios de los cohortes
app.get('/cohortes',isAuthenticated,isAdmin,(req,res,next) => {
  Cohort.findAll({
  include: [{model: Usuario}]
  })
})

//ASIGNA UN COHORTE A UN USUARIO
app.put('/setcohort/:id', (req,res)=> {
  Usuario.findByPk(req.body.id)
    .then(user => {
     user,
     user.cohortId = req.params.id

     user.save().then(user => res.status(201).send(user))
  })
  .catch(err => res.status(404).send(err))
})

//asigna un grupo a un usuario
app.put('/setgroup/:id', (req,res)=> {
  Usuario.findByPk(req.body.id)
    .then(user => {
     user,
     user.groupId = req.params.id

     user.save().then(user => res.status(201).send(user))
  })
  .catch(err => res.status(404).send(err))
})

//ASIGNA UN COHORTE A UN USUARIO
app.put('/setcohort/:id', (req,res)=> {
  Usuario.findByPk(req.body.id)
    .then(user => {
     user,
     user.cohortId = req.params.id

     user.save().then(user => res.status(201).send(user))
  })
  .catch(err => res.status(404).send(err))
})

//asigna un grupo a un usuario
app.put('/setgroup/:id', (req,res)=> {
  Usuario.findByPk(req.body.id)
    .then(user => {
     user,
     user.groupId = req.params.id

     user.save().then(user => res.status(201).send(user))
  })
  .catch(err => res.status(404).send(err))
})


module.exports = app;
