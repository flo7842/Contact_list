import express from "express";
import {ContactClass} from "../models/Contact.model.js";
const router = express.Router();

router.get('/', async function (req, res) {
    
    let users  = await ContactClass.retrievesByUser("6231e5de2ead18db2dcd7035");
    console.log(users);
    res.render('index',{
        title: 'Contacts',
        users:users
    })    
})

export default router;