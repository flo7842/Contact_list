import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { ContactClass } from "./src/models/Contact.model.js";
import { UserClass } from "./src/models/User.model.js";
import { exportToVCard } from "./src/exports/VCard.js";
import { exportToPdf } from "./src/exports/PDF.js";
import { deleteExcel, exportToExcel } from "./src/exports/Excel.js";
import homepage from "./src/routes/homepage.js";  
import profile from "./src/routes/profile.js";  


  

app.use(express.static('public'))
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", "./public/views");


//Monted Route
app.use("/", homepage);
app.use(profile);

app.get("/profile", function (req, res) {
  res.render("user_profile");
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
})

app.post('/register', checkNotAuthenticated, registerController)


var server = app.listen(3000, () => {
    console.log("Server online");
}).on("SIGTERM", () => {
    debug("SIGSTP signal received: closing HTTP server");
    server.close(() => {
      console.log("Server offline");
    });
});
