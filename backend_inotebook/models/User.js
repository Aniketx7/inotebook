const mongoose = require('mongoose')
const { Schema } = mongoose       //importing schema from mongoose  *zaroori hai 

// making a new schema, schema means the structure of database
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true            //You have to make one entities unique and also createIndexes() to prevent to duplicating user
    },

    password: {
        type: String,
        required: true
    },

    timeStamp: {
        type: Date,
        default: Date.now
    }
})

//exporting model
const User = mongoose.model('user', userSchema)
//User.createIndexes();           //use the createIndex() command in the shell to create a single index.,   Yaha pe ye karne se duplicate user nahi ban raha hai 
module.exports = User