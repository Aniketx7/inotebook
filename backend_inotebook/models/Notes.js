const mongoose = require('mongoose')

// making a new schema, schema means the structure of database
const notesSchema = new Schema({
    title: {
        type: string,
        required: true
    },

    description: {
        type: string, 
        required: true 
    }, 

    tag: {
        type: string,
        default: 'General'
    },


    timeStamp: {
        type: Date, 
        default: Date.now
    }
})

//exporting model 
module.exports = mongoose.model('notes', notesSchema)