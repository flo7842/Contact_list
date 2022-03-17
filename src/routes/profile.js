import express from "express";
const router = express.Router();

router.get('/profile', function (req, res) {
    res.render('profile',{
        title: 'Fiche individuelle',
    })
})

export default router;