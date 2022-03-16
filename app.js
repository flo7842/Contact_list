// const require('babel-register')
const path = require('path');
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('public'))

// ----Load view engine----
app.set('views engine', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


// ----Routes----
//Route qui affiche la page d'accueil
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
    res.render('index',{
        title: 'Liste de vos contacts',
        users:users,
    })
})

//Route qui affiche la liste des contacts
app.get('/profile', function (req, res) {
    res.render('user_profile')
})

app.listen(3000, function () {
    console.log('Server listening on port 3000...')
})