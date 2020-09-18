const server = require('express').Router();
const { Usuario} = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')  
  
//promover un usuario a instructor 
server.put('/set', (req,res)=> {
    Usuario.findByPk(req.body.id)
      .then(user => {
       user,
       user.profile = 'instructor'
  
       user.save().then(user => res.status(201).send(user))
    })
    .catch(err => res.status(404).send(err))
  })  

  //Busca UN instructor
  server.get('/:id', (req, res) => {
    Usuario.findOne({
        where: {
            id: req.params.id,
            profile: 'instructor'
        }
    }).then(instructor =>{
        !instructor
          ? res.status(404).json([])
          : res.json(instructor)
      })
      .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es valido'
        })
      )
  })
  
  //Trae TODOS los instructores 
  server.get('/', (req, res) => {
    Usuario.findAll({
        where:{
            profile: 'instructor'
        }
    })
      .then(instructor => res.send(instructor))
      .catch(() => res.status(400).send([])
      )
  })
  module.exports = server;

