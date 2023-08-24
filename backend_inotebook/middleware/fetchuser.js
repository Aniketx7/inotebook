var jwt = require('jsonwebtoken');
const JWT_SIGN = '@anikEt2389$$Kr'

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SIGN);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;

        //JWT verify method is used to verify the token, take two arguments one is toekn string value, and second one is secret key for matching the toekn is valid or not.
        //The validation method returns a decode object that we stored the token in.