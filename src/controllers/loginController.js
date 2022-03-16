var LocalStrategy = require('passport-local');



const loginView = (req, res) => {
    
    // passport.authenticate("local", function(err, user, info) {
    //     if(err){
    //         res.render('auth/login', { title: 'register', error: err});
    //     }
    //     if(!user){
            res.render('auth/login', { title: 'register', error: 'Cette utilisateur n\'existe pas'});
        // }
        // req.logIn(user, function(err) {
        //     if(err){
        //         res.render('auth/login', { title: 'register', error: err});
        //     }
        //     res.render('index', { title: 'register', success: "Bienvenue"});
        // });
    //})(req, res, next);
}

module.exports = {
    loginView
};