import {UserClass} from "../models/User.model.js";
import bcrypt from 'bcryptjs';

const registerController = (async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    UserClass.register({
        username: req.body.username,
        password: hashedPassword
    }).then(data => {
        console.log(data, "L'utilisateur")
        res.redirect('/login')
    }).catch(err => {
        console.error(err)
        res.redirect('/register')
    })
});

export { registerController };