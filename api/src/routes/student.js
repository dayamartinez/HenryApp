//BUSCA TODOS LOS USUARIOS QUE SEAN ALUMNOS
const server = require('express').Router();
const { Usuario, PM, Cohort, Group} = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')  
  
//asigna un usuario como estudiante
server.put('/', (req,res)=> {
    Usuario.findByPk(req.body.id)
      .then(user => {
       user,
       user.profile = 'student'
  
       user.save().then(user => res.status(201).send(user))
    })
    .catch(err => res.status(404).send(err))
  })  

  //Busca UN Alumno
  server.get('/:id', (req, res) => {
    Usuario.findOne({
        where: {
            id: req.params.id,
            rol: 'user'
        }
    }).then(pm =>{
        !pm
          ? res.status(404).json([])
          : res.json(pm)
      })
      .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es valido'
        })
      )
  })
    
  //Trae TODOS los Alumnos 
  server.get('/', (req,res) => {
    Usuario.findAll({
      where: {
        rol: 'user'
      }, include: [PM, Cohort, Group]
    })
    .then( students => {
        res.status(200).send(students);
    })
    .catch(err => res.status(404).send(err))
  })
  module.exports = server;
