import express from "express";
const router = express.Router();
import QRCode from "qrcode";
import { ContactClass } from "../models/Contact.model.js";
import {exportToVCard} from "../exports/VCard.js";

router.get('/suppression-fiche-contact/:id', async function(req, res, next) {
    if(req.params.id){
        await ContactClass.delete(req.params.id);
    }
    res.redirect('/');
})

router.get('/fiche-contact/:id', async function (req, res, next) {
    if(req.params.id){
        let contact = await ContactClass.retrieve({_id:req.params.id});
        
        // console.log('CONTACT', contact);
        if(contact && (contact != undefined) ){
            let qrcode = await QRCode.toDataURL(exportToVCard(contact[0]));
            res.render('contact',{
                title: 'Fiche Contact',
                user:contact[0],
                data:qrcode
            });
            return;
        }
    }
    

    const defaultUser = {
        firstname: "John",
        lastname: "Doe",
        email: 'example',
        phone: '0145287098',
       
    }
    const qrcode = await QRCode.toDataURL(exportToVCard(defaultUser));
        
    res.render('contact',{
        title: 'Fiche individuelle',
        user:defaultUser,
        data:qrcode
    })
})

export default router;