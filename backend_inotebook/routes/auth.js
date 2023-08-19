const express = require('express');
const User = require('../models/User');         //import User.js from models 
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');          //bcryps js used to hash passwrod 
var jwt = require('jsonwebtoken');          //jsw fascilate a secure connection between user and backend

const JWT_SIGN = '@anikEt2389$$Kr'

const router = express.Router()     //ham router express ke Router function ko router const ko pkda diye

// Create a user using: POST "api/auth/createUser" Doesn't require authentication 
router.post('/createUser', [
    // using express validator                   (maine body ko express-validator pkg se import kiya hai )
    body("name").isLength({ min: 3 }),           //says, name key ka length min 3 hona chahiye
    body("email").isEmail(),                     //says, email ek valid email hona chahiye 
    body("password").isLength({ min: 6 })

], async (req, res) => {
    console.log(req.body);

    // handling error 
    const errors = validationResult(req)                //getting request body object
    if (!errors.isEmpty()) {                            //if errors var (request body obj) become invalid, ...
        return res.status(400).json({ errors: errors.array() });
    }


    // Now, user schema me request body save hoke database me jayega 
    try {
        let findUser = await User.findOne({ email: req.body.email });          //Find if there is an another unique email in database
        if (findUser) {                                                       //If it return true, send bad request and json error 
            return res.status(500).json({ error: 'Email already exists', })
        }

        //else DO THIS

        // Hashing password using bcryptjs 
        const salt = await bcrypt.genSalt(10);            //genSaltSync is bcrypt's function 
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({       //create user(User is  already imported), create is express-validator function 

            //Important-- you must use key name as yours in User schame 

            name: req.body.name,                        //get name from req.body(jo ham request post kiye hai)
            email: req.body.email,
            password: secPass
        })


        //A objct which takes id from mogno
        const data = {
            userId: {
                id: user.id
            }
        }

        var authtoken = jwt.sign(data, JWT_SIGN);       //jwt sign 

        res.json({ authtoken })
    }
    catch (error) {
        console.log(error.message)
    }

    // After that your user data(which you provide using post method) post on database
});


///////////////////////////////////////

// Creating a login endpints

///////////////////////////////////////

// login a user using: POST "api/auth/login" Doesn't require authentication

router.post('/login', [
    // using express validator                   (maine body ko express-validator pkg se import kiya hai )
    body("email").isEmail(),                     //says, email ek valid email hona chahiye 
    body("password").exists()

], async (req, res) => {


    const errors = validationResult(req)                //getting request body object
    if (!errors.isEmpty()) {                            //if errors var (request body obj) become invalid, ...
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let findUser = await User.findOne({ email });          //Find if there is an another unique email in database
        if (!findUser) {                                                       //If it return true, send bad request and json error 
            return res.status(400).json({ error: 'Login with valid credentials', })
        }

        // comparing password of user and of database password using bcrypt js 
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ error: 'Incorrect Password', })

        }

        const data = {
            userId: {
                id: user.id
            }
        }

        var authtoken = jwt.sign(data, JWT_SIGN);       //jwt sign 

        res.json({ authtoken })


    }
    catch (error) {
        console.log(error.message)

    }


})


module.exports = router