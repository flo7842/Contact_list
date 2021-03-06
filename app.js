import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import homepage from "./src/routes/homepage.js";  
import contact from "./src/routes/contact.js";
import profile from "./src/routes/profile.js";
import session from "express-session";
import auth from "./src/routes/auth.js";

import MongoStore from 'connect-mongo'

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "pug");
app.set("views", "./public/views");

app.use(
    session({
        secret: 'hello',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 24 * 60 * 60 * 1000},
        store: MongoStore.create({ mongoUrl: process.env.DB_URL })
    })
)

app.get('/profile', function (req, res) {
    res.render('user_profile')
})

//Monted Route
app.use(homepage);
app.use(contact);
app.use(profile);
app.use(auth);

app.get('/logout', (req, res, next) => {
    //console.log(req, 'req logout')
    req.session.destroy()
    res.redirect('/login')
})

var server = app.listen(3000, () => {
    console.log("Server online");
}).on("SIGTERM", () => {
    debug("SIGSTP signal received: closing HTTP server");
    server.close(() => {
      console.log("Server offline");
    });
});