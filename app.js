require('babel-register')
const { loginView } = require('./src/controllers/loginController');
console.log(loginView);
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router();
import "dotenv/config";

import transaction from "./db/mongo/connexion.js";
import express from "express";
import bodyParser from "body-parser";
import { Contact } from "./db/mongo/Models/Contact.model.js";
import { UserClass } from "./db/mongo/Models/User.model.js";
import { exportToVCard } from "./db/mongo/Export/VCard.js";
import { exportToPdf } from "./db/mongo/Export/PDF.js";

app.use(bodyParser.json())

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

app.set('view engine', 'pug')
app.set('views', './src/views');

router.get('/', (req,res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!'})
})

router.get('/login', loginView);

// app.get('/register', (req,res) => {
//     res.render('auth/register', { title: 'Hey', message: 'Hello there!'})
// })


app.use('/', router);


app.listen(3000, console.log("Le serveur est démarré sur le port 3000"))