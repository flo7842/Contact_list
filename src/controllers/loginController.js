var LocalStrategy = require('passport-local');



const loginView = (req, res) => {
    



    res.render('auth/login', { title: 'Login', message: 'Login page!'})
}

module.exports = {
    loginView
};