import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import {UserClass} from "../models/User.model.js";
import bcrypt from "bcryptjs";
import Q from "q"
import {registerController} from "../controllers/registerController.js";
import {checkAuthenticated, checkNotAuthenticated} from "../middlewares/checkAuthStatus.js";
const router = express.Router();

router.get('/login', checkNotAuthenticated,(req, res, next) => {
    console.log(req.session.passport)
    res.render('auth/login');
})

passport.use(UserClass.User.createStrategy());
var deferred = Q.defer();

passport.use(new LocalStrategy(

    function(username, password, done) {
        UserClass.findUser({username: username})
            .then(function (result) {
                if (null == result) {
                    console.log("USERNAME NOT FOUND:", username);
                    return done(null, false, {
                        message: 'Cette utilisateur n\'existe pas !' });
                    deferred.resolve(false);
                }
                else {
                    var hash = result.password;

                    console.log("FOUND USER: " + result.username);

                    if (bcrypt.compareSync(password, hash)) {
                        deferred.resolve(result);
                        console.log(result, "result")
                        return done(null, result);
                    } else {
                        console.log("AUTHENTICATION FAILED");
                        return done(null, false, {
                            message: 'Mot de passe incorrect.' });
                        deferred.resolve(false);
                    }
                }
                }
            ).catch(err => {
                console.error(err)
        })
    }
));

passport.serializeUser(function(user, cb) {

    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/'}), function(req, res, next){

})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', registerController)

export default router;