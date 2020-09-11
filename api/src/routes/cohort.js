const server = require('express').Router();
const { Usuario, Cohort } = require('../db.js');
const {isAuthenticated,isAdmin} =require('./helpers')

//Crear cohorte
server.post('/create',  (req, res) => {
    const { name, about } = req.body
    const capName = name.charAt(0).toUpperCase() + name.slice(1)
      if (!name || !about) {
          res.status(400).json({
              error: true,
              message: 'Debe enviar los campos requeridos'
          })
      }
  
      Cohort.create({
          name: capName,
          about
    }) 
      .then(cohort => {
          res.status(201).json({
              success: true,
              message: 'Nuevo Cohorte creado correctamente',
              cohort
          })
      })
      .catch( () => {
          res.status(500).json({
              error: true,
              message: 'Ya existe un cohorte con ese nombre'
          })
      })
  })
  
  //Mofificar cohorte 
  server.put('/update/:id',  (req, res) => {
    const { name, about } = req.body
      const capName = name.charAt(0).toUpperCase() + name.slice(1)
      Cohort.findByPk(req.params.id)
          .then(cohort => {
              cohort.name = capName || cohort.name
              cohort.about = about || cohort.about
  
              cohort.save().then(cohort => {
                  res.status(201).json({
            success: true,
            message: 'Cohorte modificado correctamente',
            cohort
          })
              })
          })
          .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es valido'
        })
      )
  })
  
  //Busca UN cohorte
  server.get('/:id', (req, res) => {
    Cohort.findOne({
      where: {
        id: req.params.id,
      },
      include: [Usuario]
    })
      .then(cohort =>{
        !cohort
          ? res.status(404).json([])
          : res.json(cohort)
      })
      .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es valido'
        })
      )
  })
  
  //Trae TODOS los cohortes 
  server.get('/', (req, res) => {
    Cohort.findAll()
      .then(cohorts => res.send(cohorts))
      .catch(() => res.status(400).json({
        error: true,
        message: 'error al buscar los cohortes'
       })
      )
  })
  
  module.exports = server;