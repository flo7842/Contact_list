import express from "express";
import {ContactClass} from "../models/Contact.model.js";
import {checkAuthenticated} from "../middlewares/checkAuthStatus.js";
const router = express.Router();

router.get('/', checkAuthenticated, async function (req, res) {
    console.log(req.session.passport)
    let users  = await ContactClass.retrievesByUser("6231e5de2ead18db2dcd7035");

    res.render('index',{
        title: 'Contacts',
        users:users
    })    
})

export default router;