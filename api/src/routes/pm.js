const server = require('express').Router();
const { Usuario, PM, Group } = require('../db.js');
//const {isAuthenticated,isAdmin} =require('./helpers')  
  
//promover un usuario a PM 
server.put('/set', (req,res)=> {
    Usuario.findByPk(req.body.id)
      .then(user => {
       user  
       PM.create({usuarioId: user.id})
       user.save().then(user => {
       res.status(201).send(user)
    })
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
  
  //Asignar cohorte a PM
  // server.put('/setCohort/:id', (req,res) => {
  //   PM.findByPk(req.body.id)
  //   .then(pm => {
  //     pm,
  //     pm.cohortId = req.params.id

  //     pm.save().then(pm => {
  //       res.status(201).send(pm)
  //     })
  //   })    
  //   .catch(err => res.status(404).send(err))
  // })


  //Asignar pms a un cohorte
  server.put('/setCohort/:id', (req,res) => {
    var asignarCohorte={cohortId:req.params.id}
    PM.findAll({
      where:{
        cohortId:null
      }
    })
    .then(pm => {
      pm.map(p=>{
        p.update(asignarCohorte)
      })
      pm.save()
      res.status(201).send(pm)
    })    
    .catch(err => res.status(404).send(err))
  })

  server.put("/setGroup/:id", (req,res)=>{
    PM.findAll({
      where:{
        cohortId:req.params.id
      }
    })
    .then(pms=>{
      Group.findAll({
        where:{
          cohortId:req.params.id
        }
      })
      .then(async groups=>{
        let i = 0,j=0;
        while(i<groups.length){
          console.log(i)
          let aux = {groupId:groups[i].id}
          pms[j].update(aux)
          await pms[j].save()
          .then(()=>{
            i++
            j++
            if(pms[j] && i>groups.length){
              i=0
            }
          })
        }
      })
    })
    .then(()=>res.status(201).send("holi"))
    .catch(()=>res.status(400).send("adiu"))
  })

  //Eliminar PM
  server.delete('/:id', (req, res) => {
    PM.findByPk(req.params.id)
    .then((pm) => {
      pm.destroy()
      res.status(200).json(pm)
    })
  })


  //Trae TODOS los PM 
  server.get('/', (req, res) => {
    PM.findAll({
        include:[Usuario, Group]
    })
      .then(pms => res.send(pms))
      .catch(() => res.status(400).send([]))
  })
  module.exports = server;