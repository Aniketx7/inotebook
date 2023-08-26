const mongoose = require('mongoose')
const { Schema } = mongoose       //importing schema from mongoose  *zaroori hai 


// making a new schema, schema means the structure of database
const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,       //Give schema OBJECT ID
        ref: 'user'         //This is reference from user (WHICH IS exported by Notes schema)
    },
    title: {
        type: String,
        required: true
    },

    description: {
        type: String, 
        required: true 
    }, 

    tag: {
        type: String,
        default: 'General'
    },


    timeStamp: {
        type: Date, 
        default: Date.now
    }
})

//exporting model 
module.exports = mongoose.model("notes", notesSchema)