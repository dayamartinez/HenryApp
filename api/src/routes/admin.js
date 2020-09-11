const server = require('express').Router();
const { Usuario } = require('../db.js');
const {isAuthenticated,isAdmin} =require('./helpers')

//rutas para ver todos los usuarios, modificar un usuario, borrar un usuario

//se trae todos los usuarios
server.get('/',isAuthenticated,isAdmin,(req,res,next) => {
    Usuario.findAll()
    .then( usuario => {
        res.status(200).send(usuario);
    })
})


//Busca un usuario por su ID
server.get('/:id',isAuthenticated,isAdmin,(req,res,next) => {
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
server.put('/isAdmin/:id',isAuthenticated,isAdmin,(req,res,next) => {
   Usuario.findByPk(req.params.id)
  .then ( function(usuario){
    usuario.rol = "admin";
    usuario.save();
    res.status(201).send("Este usuario ahora es administrador")
  })
})


//borra un usuario (no lo borra de la base, sino que lo pasa a estado inactivo)
server.delete('/:id',isAuthenticated,isAdmin,(req,res,next)=>{
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

module.exports = server;
