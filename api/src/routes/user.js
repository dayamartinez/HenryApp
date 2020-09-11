const {Usuario} = require ('../db')//SE IMPORTO LA DATABASE{SE MODIFICO EL MODELO PARA PODER CREAR USERS..}
const express = require('express');
const server = require('express').Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');

//app.use(cors());

//Creamos los usuarios en la BD

server.post('/', (req, res, next) => {
  console.log(req.body);
  Usuario.create({
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
  })
  .then((usuario) =>{
    return res.json(usuario);
  })
  .catch(next);
})

module.exports = server;
