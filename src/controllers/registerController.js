import {UserClass} from "../models/User.model.js";
import bcrypt from 'bcryptjs';

const registerController = (async (req, res, next) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await UserClass.register({
        username: req.body.username,
        password: hashedPassword
    }, 'test').then(async data => {

        res.redirect('/login')
    }).catch(err => {
        console.error(err)
        res.redirect('/register')
    })
  next()
});

export { registerController };