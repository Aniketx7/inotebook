const express = require('express');
const User = require('../models/User');         //import User.js from models 
const { body, validationResult } = require('express-validator')

const router = express.Router()     //ham router express ke Router function ko router const ko pkda diye

// Create a user using: POST "api/auth/createUser" Doesn't require authentication 
router.post('/createUser', [
    // using express validator      (maine body ko express-validator pkg se import kiya hai )
    body("name").isLength({ min: 3 }),      //says, name key ka length min 3 hona chahiye
    body("email").isEmail(),                //says, email ek valid email hona chahiye 
    body("password").isLength({ min: 6 })

], async (req, res) => {
    console.log(req.body);

    // handling error 
    const errors = validationResult(req)        //getting request body object
    if (!errors.isEmpty()) {                //if errors var (request body obj) become invalid, ...
        return res.status(400).json({ errors: errors.array() });
    }


    // Now, user schema me request body save hoke database me jayega 
    try {
        let user = await User.findOne({ email: req.body.email });          //Find if there is an another unique email in database
        if (user) {          //If it return true, send bad request and json error 
            return res.status(500).json({ error: 'Email already exists', })
        }
        //else DO THIS
        user = await User.create({       //create user(User is  already imported), create is express-validator function 
            //Important-- you must use key name as yours in User schame 

            name: req.body.name,        //get name from req.body(jo ham request post kiye hai)
            email: req.body.email,
            password: req.body.password
        })
        res.json(user)
    }
    catch (error) {
        console.log(error.message)
    }

    // After that your user data(which you provide using post method) post on database
})







module.exports = router