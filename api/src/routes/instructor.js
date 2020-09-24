const server = require('express').Router();
const { Staff, Cohort } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')  

//const {isAuthenticated,isAdmin} =require('./helpers')  
  
//promover un usuario a instructor 
server.put('/set', (req,res)=> {
    Staff.findByPk(req.body.id)
      .then(user => {
       user,
       user.profile = 'instructor'
  
       user.save().then(user => res.status(201).send(user))
    })
    .catch(err => res.status(404).send(err))
  })  

  //Crear un instructor
  server.post('/create',  (req, res) => {
    Staff.findOne({
      where:{
        email: req.body.email
      }
    })
    .then(resp=>{
      if(resp){
        res.status(400).send("Usuario existente!")
      }
    })
    var {email, name, lastName} = req.body;
      Staff.create({
        email,
        name,
        lastName
      })
      .then((user) =>{
        return res.status(201).send(user);
      })
      .catch(err => res.status(404).send(err));
  })

  //Asignar cohorte a instructor
  server.put('/setCohort/:id', (req,res) => {
    Staff.findByPk(req.body.id)
    .then(instructor => {
      instructor
        .setCohorts(req.params.id)
      
      instructor.save().then(instructor => res.status(201).send(instructor))
    })
    .catch(err => res.status(404).send(err))
    })

  //Busca UN instructor
  server.get('/:id', (req, res) => {
    Staff.findOne({
        where: {
            id: req.params.id,
            profile: 'instructor'
        },
        include: {
            model: Cohort
        }
    }).then(instructor =>{
        !instructor
          ? res.status(404).json([])
          : res.json(instructor)
      })
      .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es válido'
        })
      )
  })
  
  //Trae TODOS los instructores 
  server.get('/', (req, res) => {
    Staff.findAll({
        where:{
            profile: 'instructor'
        },
        include: {
            model: Cohort
        }
    })
      .then(instructors => res.send(instructors))
      .catch(() => res.status(400).json({
        error: true,
        message: 'Error al buscar los instructores'
       })
      )
  })
  module.exports = server;

