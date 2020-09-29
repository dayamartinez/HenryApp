const nodemailer = require('nodemailer');
const express = require('express');
const app = require('express').Router();
const Sequelize = require('sequelize');
const db = require ('../db')
const Op = Sequelize.Op;
// const cors = require("cors");
// app.use(cors());


//enviar mail para invitar a la HenryApp
app.post('/send-email/:email', (req, res) => {
    const emails = req.body;
    
    //se hace un map con el array de emails que se importan desde excel y se transforman a un json
    emails.map((email) => {
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
            to: email.emails,
            subject: "Enviado desde HenryApp",
            text: "Bienvenido a HenryApp!! Para registrarse haga click en el siguiente link "
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
});

//enviar mail en caso de haber olvidado la contraseña

app.put('/send-email/forgotpassword', (req, res) => {
  const {email,birthday} = req.body;
  db.Usuario.findOne({
      where:{
          email,
        //   birthday
      }
  })
  .then(user=>{
    user.password = null;
    user.save();
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
        from: "Remitente",
        to: email,
        subject: "Enviado desde HenryApp",
        text: "Entre a este link para poder crear su nueva contraseña http://localhost:3000/inviteuser"
    }
    
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                res.status(500).send(err)
            } else {
                console.log("Email enviado")
                res.status(200).json(req.body)
            }
        })
    res.status(201).send('Password reseteada');    
    })
    .catch(err=>{
        res.status(404).send(err)
    })
});





module.exports = app;
