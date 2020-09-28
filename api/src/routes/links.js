const server = require('express').Router();
const {Links} = require('../db.js');

//crear link 
server.post('/:id', (req, res) => {
    const {links, name, module, staffId} = req.body
    Links.create({
        links,
        name,
        module,
        cohortId: req.params.id,
	    staffId
    })
    .then(link => res.status(201).send(link))
    .catch(err => res.status(404).send(err))
})

//Eliminar link
server.delete('/:id', (req, res) => {
    Links.findByPk(req.params.id)
    .then((link) => {
      link.destroy()
      res.status(200).json(link)
    })
  })

//trae todos los links
server.get('/', (req, res) => {
    Links.findAll()
    .then(links => res.status(200).send(links))
    .catch(err => res.status(404).send(err))
})

module.exports = server 