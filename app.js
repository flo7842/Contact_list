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
import {toto} from "./src/models/user.js";
import LocalStrategy from "passport-local";
import transaction from "./src/databases/mongo/connexion.js";

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
    saveUninitialized: true
}))



app.use(passport.initialize())
app.use(passport.session())

passport.use(transaction().createStrategy());

passport.use(new LocalStrategy(
    // function of username, password, done(callback)
    function(username, password, done) {
        // look for the user data
        toto.findOne({username: username})
            .then(async (user, err) => {
                    // if there is an error
                console.log(user, "Le user")
                    if (err) { return done(err); }
                    // if user doesn't exist
                    if (!user) { return done(null, false, { message: 'User not found.' }); }
                    // if the password isn't correct
                    //if (!user.verify(password)) { return done(null, false, {
                    //    message: 'Invalid password.' }); }
                    // if the user is properly authenticated
                    return done(null, user);
            })
        //     , function (err, user) {
        //     // if there is an error
        //     if (err) { return done(err); }
        //     // if user doesn't exist
        //     if (!user) { return done(null, false, { message: 'User not found.' }); }
        //     // if the password isn't correct
        //     if (!user.verifyPassword(password)) { return done(null, false, {
        //         message: 'Invalid password.' }); }
        //     // if the user is properly authenticated
        //     return done(null, user);
        // });
    }
));

passport.serializeUser(transaction().serializeUser());
passport.deserializeUser(transaction().deserializeUser());

app.get('/', function (req, res) {

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

app.get('/login', (req, res) => {
    res.render('auth/login');
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/', success: '/' }))

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

