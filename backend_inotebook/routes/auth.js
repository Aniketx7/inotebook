const express = require('express');
const User = require('../models/User');         //import User.js from models 
const { body, validationResult } = require('express-validator')

const router = express.Router()     //ham router express ke Router function ko router const ko pkda diye

// Create a user using: POST "api/auth" Doesn't require authentication 
router.post('/', [
    // using express validator      (maine body ko express-validator pkg se import kiya hai )
    body("name").isLength({ min: 3 }),      //name key ka length min 3 hona chahiye
    body("email").isEmail(),                //email ek valid email hona chahiye 
    body("password").isLength({ min: 6 })

], (req, res) => {
    console.log(req.body);

    // handling error 
    const errors = validationResult(req)        //getting request body object
    if (!errors.isEmpty()) {                //if errors var (request body obj) become invalid, ...
        return res.status(400).json({ errors: errors.array() });
    }


    // Now, user schema me request body save hoke database me jayega 
    User.create({       //create user(User is  already imported), create is express-validator function 
        //Important-- you must use key name as yours in User schame 

        name: req.body.name,        //get name from req.body(jo ham request post kiye hai)
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))     //then as in json request post
        .catch(eror => {
            console.log(eror);
            res.json({error: 'Email already exists'})
        })

    // After that your user data(which you provide using post method) post on database
})







module.exports = router