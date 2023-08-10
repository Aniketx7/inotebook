const mongoose = require('mongoose')

// making a new schema, schema means the structure of database
const userSchema = new Schema({
    name: {
        type: string,
        required: true
    },

    email: {
        type: string,
        required: true
    },

    password: {
        type: string, 
        required: true 
    }, 

    timeStamp: {
        type: Date, 
        default: Date.now
    }
})

//exporting model
module.exports = mongoose.model('user', userSchema)