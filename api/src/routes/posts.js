const server = require('express').Router();
const {Post } = require('../db.js');

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
    Post.findAll()
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(404).send(err))
})

module.exports = server 