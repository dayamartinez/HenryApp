const server = require('express').Router();
const { Usuario, Cohort } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')  
  
  //Busca UN instructor
  server.get('/:id', (req, res) => {
    Usuario.findOne({
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
    Usuario.findAll({
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