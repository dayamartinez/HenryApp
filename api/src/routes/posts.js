const server = require('express').Router();
const {Post, Staff } = require('../db.js');

//crear posts 
server.post('/:id', (req, res) => {
    const {comments, staffId} = req.body
    Post.create({
        comments,
        cohortId: req.params.id,
	      staffId
    })
    .then(post => res.status(201).send(post))
    .catch(err => res.status(404).send(err))
})

//Eliminar post
server.delete('/:id', (req, res) => {
  Post.findByPk(req.params.id)
  .then((post) => {
    post.destroy()
    res.status(200).json(post)
  })
})

//trae todos los posts
server.get('/', (req, res) => {
    Post.findAll({
      order:[ ["id","DESC"] ],
      include: [Staff]
    })
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(404).send(err))
})



//cambia a inactivo los post
server.put('/inactive/:id', (req, res) => {
  Post.findOne({
    where: {
      cohortId: req.params.id,
      id: req.body.id
     }
  })
  .then(post => {
    post.active = false
    post.save().then(post => res.status(201).send(post))
  })
  .catch(err => res.status(404).send(err))
})

//trae todos los posts activos de un cohorte especifico
server.get('/active/:id', (req, res) => {
  Post.findAll({
    where: {
      active: true,
      cohortId: req.params.id,
    }
  })
  .then(posts => res.status(200).send(posts))
  .catch(err => res.status(404).send(err))
})

module.exports = server 