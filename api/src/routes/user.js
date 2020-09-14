const db = require ('../db')//SE IMPORTO LA DATABASE{SE MODIFICO EL MODELO PARA PODER CREAR USERS..}
const express = require('express');
const server = require('express').Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const  { hash } = require( 'bcrypt');
//const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');

//app.use(cors());
server.get('/', (req,res,next) => {
  Usuario.findAll()
  .then( usuario => {
      res.status(200).send(usuario);
  }).catch(next)
})
//Creamos los usuarios en la BD

server.post('/', async (req, res, next) => {
  db.Usuario.findOne({
    where:{
      email: req.body.email
    }
  })
  //COMPRUEBA SI EL USER YA SE ENCUENTRA EN LA BASE DE DATOS!
  .then(resp=>{
    if(resp){
      //MANEJO DE ERRORES FIJARSE EL FRONT!!
      res.status(400).send("Usuario existente!")
    }
  })
  var {email, password, name, lastName} = req.body;
  if (email && password && name && lastName){
    password = await hash(password,10);
    //SE COMENTARON VARIOS CAMPOS PARA PODER CREAR USUARIOS, LA IDEA ES QUE SE LLENE UN FORMULARIO DESPUES PARA CAMBIAR ESOS CAMPOS!
    db.Usuario.create({
      name,
      lastName,
      // birthday: req.body.birthday,
      // address: req.body.address,
      // country: req.body.country,
      // about: req.body.about,
      email,
      password
      // profile: req.body.profile,
      // rol: req.body.rol,
    })
    .then((user) =>{
      return res.status(201).send(user);
    })
    .catch(next);
  } else {
    res.status(500).send(err)
  }
})

//Modificar usuarios (cada usuario puede modificar sus propios datos)

server.put('/settings/:id', (req, res, next) => {
  var userUp = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    address: req.body.address,
    country: req.body.country,
    about: req.body.about,
    email: req.body.email,
    password: req.body.password,
    profile: req.body.profile,
    rol: req.body.rol,
  }

  Usuario.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    user.update(userUp)
      .then(newUser => {
        newUser.save()
        res.status(200)
        return res.json(newUser);
      })
  }).catch(next)
})

//Modificar usuarios (cada usuario puede modificar sus propios datos)

server.put('/settings/:id', (req, res, next) => {
  var userUp = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    address: req.body.address,
    country: req.body.country,
    about: req.body.about,
    email: req.body.email,
    password: req.body.password,
    profile: req.body.profile,
    rol: req.body.rol,
  }

  Usuario.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    user.update(userUp)
      .then(newUser => {
        newUser.save()
        res.status(200)
        return res.json(newUser);
      })
  }).catch(next)
})

module.exports = server;
