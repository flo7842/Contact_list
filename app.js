import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { ContactClass } from "./src/models/Contact.model.js";
import { UserClass } from "./src/models/User.model.js";
import { exportToVCard } from "./src/exports/VCard.js";
import { exportToPdf } from "./src/exports/PDF.js";
import { deleteExcel, exportToExcel } from "./src/exports/Excel.js";
import homepage from "./src/routes/homepage.js";  
import contact from "./src/routes/contact.js";
import profile from "./src/routes/profile.js";
import {checkNotAuthenticated} from "./src/middlewares/checkAuthStatus.js";
import {registerController} from "./src/controllers/registerController.js";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import transaction from "./src/databases/mongo/connexion.js";
import MongoStore from "connect-mongo";

import {checkAuthenticated, checkNotAuthenticated} from "./src/middlewares/checkAuthStatus.js";
import {toto} from "./src/models/user.js";
import LocalStrategy from "passport-local";
import transaction from "./src/databases/mongo/connexion.js";

const app = express()
const router = express.Router();

app.use(express.static('public'))
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", "./public/views");

// Cette importation nécessite d'être déclaré avant le passport initialize et le passport session
app.use(session({
    secret: "toto",
    resave: false,
    saveUninitialized: false
}))

//Monted Route
app.use(homepage);
app.use(contact);
app.use(profile);

// app.get("/contact", function (req, res) {
//   res.render("user_contact");
// });

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

app.post('/login', passport.authenticate('local', { failureRedirect: '/', success: '/' }))

var server = app.listen(3000, () => {
    console.log("Server online");
}).on("SIGTERM", () => {
    debug("SIGSTP signal received: closing HTTP server");
    server.close(() => {
      console.log("Server offline");
    });
});
