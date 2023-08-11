const mongoose = require('mongoose')
const { Schema } = mongoose       //importing schema from mongoose

// making a new schema, schema means the structure of database
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
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
module.exports = mongoose.model('user', userSchema) 