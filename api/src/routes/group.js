const server = require('express').Router();
//const { CohortList } = require('../../../client/src/components/Cohort/CohortList.jsx');
const { Usuario, Group, Cohort, PM } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')

//Creamos un grupo
// const repartirAlumnos = function(alumnos,grupos){
//   var res =[]
//   var i = 0,k = alumnos.length/grupos
//   while(i<alumnos.length){
//     res.push(alumnos.slice(i,i+k))
//     i+=k
//   }
//   if (res.length != grupos){
//     console.log("holi")
//     let j = 0
//     while(res[grupos].length){
//       res[j].push(res[grupos].shift())
//       j++
//     }
//     res.pop()
//   }

// }
//se elimino todo lo relacionado con el pairprograming
server.post('/create',  (req, res) => {

  //grupos = a la cantidad de grupos deseados
    const { cohortId, grupos} = req.body
      if (!cohortId || !grupos) {
          res.status(400).json({
              error: true,
              message: 'Debe enviar los campos requeridos'
          })
      }
      let i = 0,groupsId=[]
      while(i<grupos){
        Group.create({
          name: "WebFt_"+cohortId+"_"+(i+1),
          cohortId:cohortId
        })
        .then(g=>{
          groupsId.push(g.id)
        })
        i++
      }
      Usuarios.findAll({
        where:{
          groupId:null
        }
      })
      .then(user=>{

      })
      res.status(200).send("holi")
      
  })

  server.put('/setCohort/:id', (req,res) => {
    Group.findByPk(req.body.id)
    .then(group => {
      group,
      group.cohortId = req.params.id
      group.save().then(group => {
        res.status(201).send(group)
      })
    })
    .catch(err => {
      res.status(404).send(err)
    })
  })


  //Mofificamos el grupo
  server.put('/update/:id',  (req, res) => {
    const { name } = req.body
      const capName = name.charAt(0).toUpperCase() + name.slice(1)
      Group.findByPk(req.params.id)
          .then(group => {
            group.name = capName || group.name
  
            group.save().then(group => {
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
      include: {
        model: Usuario
      }
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
  
  //Trae TODOS los grupos, con sus usuarios y cohortes correspondientes
  server.get('/', (req, res) => {
    console.log("holi")
    Group.findAll({
      include:[{model: Usuario}, {model: Cohort}, {model: PM}]
    }
    ).then(groups => res.status(200).send(groups))
      .catch(() => res.status(400).json({
        error: true,
        message: 'error al buscar los grupos'
       })
      )
  })

  //Asignar grupo a cohorte
  server.put('/setCohort/:id', (req,res) => {
    Group.findByPk(req.body.id)
    .then(group => {
      group.cohortId = req.params.id

      group.save().then(group => {
        res.status(201).send(group)
      })
    }).catch(err => res.status(404).send(err))
  })
  
  module.exports = server;