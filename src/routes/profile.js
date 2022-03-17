import express from "express";
const router = express.Router();
import QRCode from "qrcode";
import {exportToVCard} from "../exports/VCard.js";

router.get('/profile',async function (req, res) {
    let user = 
        {
            firstname : "Florian",
            lastname: 'BEVIERRE',
            email: 'test@example.com',
            phone:'0145287098'
        }

    let data =await  QRCode.toDataURL(exportToVCard(user));
        
    res.render('profile',{
        title: 'Fiche individuelle',
        user:user,
        data:data
    })
})

export default router;