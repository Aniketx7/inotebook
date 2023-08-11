const express = require('express');
const User = require('../models/User');         //import User.js from models 

const router = express.Router()     //ham router express ke Router function ko router const ko pkda diye

// Create a user using: POST "api/auth" Doesn't require authentication 
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body)     //Giving request body to user.js and then schema me jo object hai usme data post hoga  then send to mongo database 
    user.save()                     //and saving user information 
    res.send('check');

    // After that your user data(which you provide using post method) post on database
})







module.exports = router