const nodemailer = require('nodemailer');
const express = require('express');
const app = require('express').Router();
const Sequelize = require('sequelize');
const cors = require("cors");
app.use(cors());

app.post('/send-email/:email', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.ethereal.email',
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
    text: "Bienvenido a HenryApp para registrarse haga click en el siguiente link"
}

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            res.status(500).send(err.message)
        } else {
            console.log("Email enviado")
            res.status(200).json(req.body)
        }
    })
});


module.exports = app;
