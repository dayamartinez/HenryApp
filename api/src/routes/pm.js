const server = require('express').Router();
const { Usuario, Cohort } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')  
  
//promover un usuario a PM 
server.put('/set', (req,res)=> {
    Usuario.findByPk(req.body.id)
      .then(user => {
       user,
       user.profile = 'pm'
  
       user.save().then(user => res.status(201).send(user))
    })
    .catch(err => res.status(404).send(err))
  })  

  //Busca UN PM
  server.get('/:id', (req, res) => {
    Usuario.findOne({
        where: {
            id: req.params.id,
            profile: 'pm'
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
  
  //Trae TODOS los PM 
  server.get('/', (req, res) => {
    Usuario.findAll({
        where:{
            profile: 'pm'
        }
    })
      .then(pms => res.send(pms))
      .catch(() => res.status(400).send([]))
  })
  module.exports = server;