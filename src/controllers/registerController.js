const passport = require("passport")
console.log(process.cwd());
const registerView = (async (req, res) => {
    // passport.authenticate("local", async function(err, user, info) {
    //     if(err){
    //         res.render('auth/login', { title: 'register', error: err});
    //     }
    //     if(!user){
    //         res.render('auth/login', { title: 'register', error: 'Cette utilisateur n\'existe pas'});
    //     }
    //     //const newUser = new User({ username: "candy", password: "toto" })
    //    // await newUser.save();
    //     req.logIn(user, function(err) {
    //         if(err){
    //             res.render('auth/login', { title: 'register', error: err});
    //         }
    //         res.render('index', { title: 'register', success: "Bienvenue"});
    //     });
    // })(req, res, next);

    const newUser = new User({ username: "candy", password: "toto" })
    await newUser.save();

    res.render(process.cwd() + '\\src\\views\\auth', { title: 'register', error: "err"});
});

module.exports = registerView;