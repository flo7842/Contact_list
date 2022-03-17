import express from "express";
const router = express.Router();

router.get('/', function (req, res) {
    let users = [
        {
            id:1,
            name: 'Ricardo MBK',
            email: 'test@example.com',
            tel:'0145287098'
        },
        {
            id:4,
            name: 'Binjamin', 
            email: 'test@example.com',
            tel:'0145287098'
        },  
        {
            id:3,
            name: 'Florian',
            email: 'test@example.com',
            tel:'0145287098'
        }
    ];

    res.render('index',{
        title: 'Liste de vos contacts',
        users:users,
    })    
})

export default router;