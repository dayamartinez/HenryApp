const server = require('express').Router();
const { Usuario, PM } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')  
  
//promover un usuario a PM 
server.put('/set', (req,res)=> {
    Usuario.findByPk(req.body.id)
      .then(user => {
       user  
       PM.create({usuarioId: user.id})
    })
    .catch(err => res.status(404).send(err))
  })  

  //Busca UN PM
  server.get('/:id', (req, res) => {
    PM.findOne({
        where: {
            id: req.params.id
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
    PM.findAll({
        include:[{model: Usuario}]
    })
      .then(pms => res.send(pms))
      .catch(() => res.status(400).send([]))
  })
  module.exports = server;