const server = require('express').Router();
const { Usuario, Group } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')

//Creamos un grupo
server.post('/create',  (req, res) => {
    const { name, startDate, about} = req.body
    const capName = name.charAt(0).toUpperCase() + name.slice(1)
      if (!name || !startDate || !about ) {
          res.status(400).json({
              error: true,
              message: 'Debe enviar los campos requeridos'
          })
      }
      Group.create({
          name: capName,
          startDate,
          about    
    }) 
      .then(group => {
          res.status(201).json({
              success: true,
              message: 'Nuevo grupo creado correctamente',
              group
          })
      })
      .catch( err => {
          res.status(500).json(err)
      })
  })
  
  //Mofificamos el grupo
  server.put('/update/:id',  (req, res) => {
    const { name, about, startDate } = req.body
      const capName = name.charAt(0).toUpperCase() + name.slice(1)
      Group.findByPk(req.params.id)
          .then(group => {
              cohort.name = capName || group.name
              cohort.startDate = startDate || group.startDate
              cohort.about = about || group.about
  
              cohort.save().then(group => {
                  res.status(201).json({
            success: true,
            message: 'Grupo modificado correctamente',
            group
          })
              })
          })
          .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es valido'
        })
      )
  })
  
  //Busca UN grupo
  server.get('/:id', (req, res) => {
    Group.findOne({
      where: {
        id: req.params.id,
      },
      include: [Usuario]
    })
      .then(group =>{
        !group
          ? res.status(404).json([])
          : res.json(group)
      })
      .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es valido'
        })
      )
  })
  
  //Trae TODOS los grupos
  server.get('/', (req, res) => {
    Group.findAll()
      .then(cohorts => res.send(groups))
      .catch(() => res.status(400).json({
        error: true,
        message: 'error al buscar los grupos'
       })
      )
  })
  
  module.exports = server;