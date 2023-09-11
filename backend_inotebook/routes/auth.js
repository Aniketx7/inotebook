const express = require('express');
const User = require('../models/User');         //import User.js from models 
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');          //bcryps js used to hash passwrod 
var jwt = require('jsonwebtoken');          //jsw fascilate a secure connection between user and backend
const fetchuser = require("../middleware/fetchuser")

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


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);                           //validationResult function , validator-express package se aaya hai 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //By using destructuring 
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SIGN);
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});






//Router 3:  get a user details using: POST "api/auth/getuser"  require authentication 
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id        //Ye jo req.user hai na, ham middleware se karwaye hai (see that)
        const userData = await User.findById(userId).select("-password")        // select ka kam hoga ki sare obj ko select karna except password
        res.send(userData)

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' })

    }
})


module.exports = router