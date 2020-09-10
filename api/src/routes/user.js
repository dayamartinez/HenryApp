const express = require('express');
const app = require('express').Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');

app.use(cors());

//Creamos los usuarios en la BD

app.post('/', (req, res, next) => {
  usuario.create({
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

module.exports = app;
