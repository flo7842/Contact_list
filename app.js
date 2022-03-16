require('babel-register')
const { loginView } = require('./src/controllers/loginController');
const { registerView } = require('./src/controllers/registerController');

const express = require('express')
const mongoose = require('mongoose');
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

const passport = require('./src/passport/setup')
const auth = require('./src/controllers/loginController');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const User = require('./src/models/user')

const PORT = 3000
const MONGO_URI = "mongodb+srv://flo7842:asse7842@cluster0.ygt8h.mongodb.net/toto?retryWrites=true&w=majority"


app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))


app.use(
    session({
        store: new MongoStore({ mongoUrl: MONGO_URI }),
        secret: "Un secret bien caché",
        resave: false,
        saveUninitialized: true,
    })
)



app.set('view engine', 'pug')
app.set('views', './src/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    next();
});


router.get('/', (req,res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!'})
})




router.get('/login', registerView);

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
    })
);







app.listen(PORT, console.log(`Le serveur est démarré sur le port ${PORT}`))