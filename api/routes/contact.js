const express = require('express');
const router = express.Router();

const contact = []

router.get('/', (req, res,next) => {
    res.status(200).json({
        // message:"Hello i am contact get route"
        contact
    });
});
router.post('/', (req, res, next) => {
    
    contact.push({
         name : req.body.name,
         email : req.body.email
    })


    res.status(201).json({
        message: "Data saved",

});

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.json({
        id
    });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id
    res.json({
        message:"Hello i am contact Put route"
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    res.json({
        message:"Hello i am contact Delete route"
    });
});


module.exports = router