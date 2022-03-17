import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { UserClass } from "./src/models/User.model.js";
import { exportToVCard } from "./src/exports/VCard.js";
import { exportToPdf } from "./src/exports/PDF.js";


import session from 'express-session'
import passport from "passport";
import {registerController} from "./src/controllers/registerController.js";

import {checkAuthenticated, checkNotAuthenticated} from "./src/middlewares/checkAuthStatus.js";


const app = express()
const router = express.Router();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set('views', './public/views');

// Cette importation nécessite d'être déclaré avant le passport initialize et le passport session
app.use(session({
    secret: "toto",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, function (req, res) {
    let users = [
        {
            id:1,
            name: 'Ricardo MBK',
            email: 'test@example.com'
        },
        {
            id:2,
            name: 'Binjamin', 
            email: 'test@example.com'
        },  
        {
            id:3,
            name: 'Florian',
            email: 'test@example.com'
        }
    ];

    res.render('index', {
      title: 'Liste de vos contacts',
      users:users,
    })
})

app.get('/profile', function (req, res) {
    res.render('user_profile')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
})

app.post('/register', checkNotAuthenticated, registerController)

const user = new UserClass();

var server = app.listen(3000, () => {
    console.log("Server online");
  
    /* transaction(async (connection) => {
      await User.create({
        username: "ricardo",
        password: "password",
      })
        .then(async (user) => {
          await user
            .save()
            .then(async (u) => {
              await Contact.create({
                firstname: "ricardo",
                lastname : "mmmmm",
                creator: u,
              }).then(async(c)=>{
                 await c.save().then(async(cc)=>{
                   await  exportToVCard(cc);
                 })
              }).catch((err) => {
                console.log("contact creation failed "+ err);
              });
  
  
            })
            .catch((err) => {
              console.log("save failed");
            });
        })
        .catch((err) => {
          console.log("user creation failed");
        });
    });*/
  
  /*
  UserClass.modify("6231e5de2ead18db2dcd7035","newpassword").then((u)=>{console.log(u)}).catch(err=>console.log(err));
  */
    /*transaction(async (connection) => {
      await Contact.findById("6231e5e02ead18db2dcd7039").then(async (u) => {
         
       console.log( exportToPdf(u));
      });
    });*/
  
   //console.log( exportToPdf());
});

//router.get('/login', registerView);

