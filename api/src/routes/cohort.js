const server = require('express').Router();
const { Usuario, Cohort, Group } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')

//Crear cohorte
server.post('/create',  (req, res) => {
    const { name, startDate, about} = req.body
    const capName = name.charAt(0).toUpperCase() + name.slice(1)
      if (!name || !startDate || !about ) {
          res.status(400).json({
              error: true,
              message: 'Debe enviar los campos requeridos'
          })
      }
      Cohort.create({
          name: capName,
          startDate,
          about,
         
      include: [Usuario]
    }) 
      .then(cohort => {
          res.status(201).json({
              success: true,
              message: 'Nuevo Cohorte creado correctamente',
              cohort
          })
      })
      .catch( err => {
          res.status(500).json(err)
      })
  })
  
  //Mofificar cohorte 
  server.put('/update/:id',  (req, res) => {
    const { name, about, startDate } = req.body
      const capName = name.charAt(0).toUpperCase() + name.slice(1)
      Cohort.findByPk(req.params.id)
          .then(cohort => {
              cohort.name = capName || cohort.name
              cohort.startDate = startDate || cohort.startDate
              cohort.about = about || cohort.about
  
              cohort.save().then(cohort => {
                  res.status(201).send(cohort)
              })
          })
          .catch(() => res.status(400).json({
                error: true,
                message: 'el id no es valido'
        })
      )
  })
  
  //Busca UN cohorte y lo trae con los usuarios y grupos del mismo
  server.get('/:id', (req, res) => {
    Cohort.findAll({
      where: {
        id: req.params.id,
      },
      include: [Usuario, Group]
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


  //Busca TODOS los grupos de un cohorte
  server.get('/groups/:id', (req, res) => {
    Cohort.findAll({
      where: {
        id: req.params.id,
      },
      include: [Usuario, Group]
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
  
  //Trae TODOS los cohortes con sus usuarios y grupos correspondientes
  server.get('/', (req, res) => {
    Cohort.findAll({include: [Usuario, Group]})
      .then(cohorts => res.send(cohorts))
      .catch(() => res.status(400).json({
        error: true,
        message: 'error al buscar los cohortes'
       })
      )
  })

  //Elimina un cohort 
  server.delete('/:id', (req, res) => {
    Cohort.findByPk(req.params.id)
		.then(cohort => {
			cohort.destroy().then(() => {
				res.status(200).json(cohort)
			})
		})
		.catch(() => res.status(404).json({
      error: true,
      message: 'el id no es valido'
      })
    )
  })
  module.exports = server;