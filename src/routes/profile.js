import express from "express";
const router = express.Router();


router.get('/profile',async function (req, res) {
    let user = 
        {
            firstname: "John",
            lastname: "Doe",
            email: 'test@example.com',
            password: '0145287098'
        }

        
    res.render('profile',{
        title: 'Bienvenue',
        user,
        
    })
})

export default router;