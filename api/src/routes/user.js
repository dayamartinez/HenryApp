const db = require ('../db')//SE IMPORTO LA DATABASE{SE MODIFICO EL MODELO PARA PODER CREAR USERS..}
const express = require('express');
const server = require('express').Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const  { hash } = require( 'bcrypt');
//const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');

//app.use(cors());

server.get('/', (req, res) => {
  db.Usuario.findAll()
    .then(users => res.send(users))
    .catch(() => res.status(400).json({
      error: true,
      message: 'error al buscar los usuarios'
     })
    )
})


//Busca usuario por email
server.get('/:email',(req,res,next)=>{
  let email = req.params.email
  console.log(email)
  db.Usuario.findAll({
    where:{email:email}
  })
  .then(user=>{if(user){res.status(200).send(user);
  return}
  })})

//ESTA RUTA ES PARA QUE UN USUARIO INVITADO PUEDA ENTRAR POR PRIMERA VEZ
server.put('/inviteuser', (req,res,next)=>{
  //VALORES PASADOS POR BODY
  var {email,password} = req.body;
  //BUSCA EL MAIL EN LA BASE DE DATOS
  db.Usuario.findOne({
    where:{
      email: email
    }
  })
  //DEVUELVE EL MAIL MODIFICA LA PASSWORD Y GUARDA!
  .then ( async user=> {
    if (!user.password){
      password = await hash(password,10);
      user.update({
        password
      })
     return res.status(201).send(user);
    } else {
      res.status(400).json({err:"El usuario tiene un perfil asociado!"})
      console.log(res.send);
    }
  })
  //MANEJO DE ERROR POR SI EL MAIL NOSE ENCUENTRA EN LA BASE DE DATOS!
  .catch(err=>{
    res.status(404).json({err:"El usuario no existe en la base de datos!"})
  })
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
  var {email, password, name, lastName, birthday, address, country} = req.body;
  if (email && password && name && lastName){
    password = await hash(req.body.password,10);
    //SE COMENTARON VARIOS CAMPOS PARA PODER CREAR USUARIOS, LA IDEA ES QUE SE LLENE UN FORMULARIO DESPUES PARA CAMBIAR ESOS CAMPOS!
    db.Usuario.create({
      //name,
      //lastName,
      //birthday,
      //address,
      //country,
      // about: req.body.about,
      email,
      //password
      // profile: req.body.profile,
      // rol: req.body.rol,
    })
    .then((user) =>{
      return res.status(201).send(user);
    })
    .catch(next);
  } else {
    res.status(500).send('error')
  }
})

//Modificar usuarios (cada usuario puede modificar sus propios datos)

server.put('/settings/:id', (req, res, next) => {
  var userUp = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    city: req.body.city,
    country: req.body.country,
    email: req.body.email,
    gmail: req.body.gmail,
    github: req.body.github,
    password: req.body.password,
    rol: req.body.rol,
    status: req.body.status,
    urlImage: req.body.urlImage,
    portadaImage: req.body.portadaImage
  }

  db.Usuario.findOne({
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


//traer perfiles de usuario que matcheen con la busqueda searchBar
server.get('/users/:id', (req,res,next) => {
  console.log('hola')
  console.log(req.body)
  console.log('hola')
  console.log(req.params)
  db.Usuario.findAll({
    where: {
			name: {
				[Sequelize.Op.iLike]: `%${req.params.id}%`
			}
		},
		where: {
			lastName: {
				[Sequelize.Op.iLike]: `%${req.params.id}%`
			}
		},
		where: {
			email: {
				[Sequelize.Op.iLike]: `%${req.params.id}%`
			}
		}
	})
  .then( usuario => {
    console.log(usuario)
      res.status(200).json(usuario);
  }).catch(err => res.status(404).send(err))
  
})

server.put('/completeprofile/:id', (req, res, next) => {
 var {id} = req.body
 console.log(id)
 console.log(req.body)
  var userUp = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    city: req.body.city,
    country: req.body.country,
    email: req.body.email,
    gmail: req.body.gmail,
    github: req.body.github,
    password: req.body.password,
    rol: req.body.rol,
    status: req.body.status,
    urlImage: req.body.urlImage,
    portadaImage: req.body.portadaImage
  }

  db.Usuario.findOne({
    where: {
      id
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
