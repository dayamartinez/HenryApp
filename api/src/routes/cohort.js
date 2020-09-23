const server = require('express').Router();
const nodemailer = require('nodemailer');
const { Usuario, Cohort, Group, Staff } = require('../db.js');

//const {isAuthenticated,isAdmin} =require('./helpers')

//Crear cohorte
/*server.post('/create',  (req, res) => {
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
*/
  //Crear cohorte
server.post('/create',  (req, res) => {
  const { name, startDate, emails} = req.body
  console.log(req.body)
  const capName = name.charAt(0).toUpperCase() + name.slice(1)
    if (!name || !startDate ) {
        res.status(400).json({
            error: true,
            message: 'Debe enviar los campos requeridos'
        })
    }
    Cohort.create({
        name: capName,
        startDate,
       
    // include: [Usuario]
  }) 
    .then(cohort => {
          // const emails = req.body;
  // console.log(req.body);
  //se hace un map con el array de emails que se importan desde excel y se transforman a un json
  emails.map((email) => {
    console.log(email)
      Usuario.create({
          email: email.email,
          cohortId: cohort.id
          
      })
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      },
      tls: {
          rejectUnauthorized: false
      }
      })

      const mailOptions = {
          from: process.env.EMAIL,
          to: email.email,
          subject: "Enviado desde HenryApp",
          text: "Bienvenido a HenryApp!! Para registrarse haga click en el siguiente link http://localhost:3000/inviteuser"
      }

      transporter.sendMail(mailOptions, (err, info) => {
          if(err){
              res.status(500).send(err)
          } 
          else {
              console.log("Email enviado")
              res.status(200).json(req.body)
          }
      })
      })
      res.status(201).send("OK")
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
    Cohort.findAll({
      include: [{model: Usuario}, {model: Group}, {model: Staff}]
    })
      .then(cohorts => res.send(cohorts))
      .catch(() => res.status(400).send([])
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