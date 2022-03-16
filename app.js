import "dotenv/config";

import transaction from "./db/mongo/connexion.js";
import express from "express";
import bodyParser from "body-parser";
import { Contact } from "./db/mongo/Models/Contact.model.js";
import { UserClass } from "./db/mongo/Models/User.model.js";
import { exportToVCard } from "./db/mongo/Export/VCard.js";
import { exportToPdf } from "./db/mongo/Export/PDF.js";

app.use(express.static('public'))
const app = express();

app.use(bodyParser.json());

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

app.set('views engine', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.get('/', function (req, res) {
    let users = [
        {
            id:1,
            name: 'Ricardo MBK',
            email: 'test@example.com'
        },
            id:2,
        {
            name: 'Binjamin', 
            email: 'test@example.com'
        },  
            id:3,
        {
            name: 'Florian',
        }
            email: 'test@example.com'
    ];
    res.render('index',{
        title: 'Liste de vos contacts',
    })
        users:users,
})
app.get('/profile', function (req, res) {
    res.render('user_profile')
})
app.listen(3000, function () {
    console.log('Server listening on port 3000...')
})