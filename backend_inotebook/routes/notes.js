const express = require('express')
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');


const router = express.Router()

////////////////////////////////////////////////////
    // Adding endpionts to Fetch All notes 
///////////////////////////////////////////////////

//Route 1: fetching all notes added using get: 'api/notes/fetchnotes" Login required(means use auth token)
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const note = await Notes.find({ user: req.user.id })
        console.log("user ID: ", req.user.id)           //auth-token me jo id dale hue hai usse nikal ke id dega ( jo ki fetchuser middleware se aaya hai  )
        res.json(note)          //It give json of all saved notes by using valid auth-token of user 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

////////////////////////////////////////////////////
    // Adding endpionts to Add new notes 
///////////////////////////////////////////////////

// Route 2: Adding a new note using post: 'api/notes/addnotes' Login required 
router.post('/addnotes', fetchuser, [
    body("title").isLength({ min: 3 }),           //says, title key ka length min 3 hona chahiye
    body("description").isLength({ min: 6 }),
    body('tag')
], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        // handling error 
        const errors = validationResult(req)                //getting request body object
        if (!errors.isEmpty()) {                            //if errors var (request body obj) become invalid, ...
            return res.status(400).json({ errors: errors.array() });
        }


        // jo Notes schema hai, usse Naya note banaya jayega jisme data request post kiye gaye hai uska hoga 
        const note = new Notes({
            title, description, tag, user: req.user.id      //Ye jo req.user.id hai wo middleware fetchuser.js se aaya hai 
        })
        const savedNotes = await note.save()
        res.json(savedNotes)


    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

////////////////////////////////////////////////////
    // Adding endpionts to update notes 
///////////////////////////////////////////////////

// Route 3: Adding a new note using post: 'api/notes/updatenotes' Login required 
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    const newNote = {}      //Ek obj banaye hai 
    if (title) { newNote.title = title }            //making the title of newNote to title of req.body(which i put request or update)
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }


    /*Getitng the notes by find id  */
    
    //FindById kya karta hai ki database me id se sare object de deta hai 
    let note = await Notes.findById(req.params.id);                     //To Ye tumhe, jo id API URL me diye ho us id ka jo DB me us id se obj bane honge wo Pura obj dega

    console.log('Your note variable', note)        
    
    /*What is there is no note like */
    if (!note) {                                    //If there is no data found with given id, send this 
        return  res.status(404).send("NOT FOUND")
    }
    console.log('Your req.usr.id ', req.user.id)

    
    /*Verifying user by matching the user of notes which to be updated with auth-token user id */
    
    //Agar jo ham id se note le rahe hai usme user(user ka id ) ka jo string(value) hai wo auth-token user obj me id hoga user ka ussee match nahi hota hai to send this...
    //Inshort:  req.params.id se jo Notes obj laye hai uska user(jo ki usme ek user key hai) aur auth-token ka user match nahi karta hai to...
    if (note.user.toString() !== req.user.id) { 
        return res.status(401).send('Not a valid credentials')
    }


    
    // findByIdAndUpdate is a mongoose function 
    //findByIdAndUpdate take these argument (id kya hai, {kya obj udpat karwana hai }, {Naya jo banega wo database me save hoga })
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({note})
    

})


router.delete('/deletenote/:id', fetchuser, async (req, res) => { 
    let note = await Notes.findById(req.params.id);                     //To Ye tumhe, jo id API URL me diye ho us id ka jo DB me us id se obj bane honge wo Pura obj dega
    if (!note) {                                    //If there is no data found with given id, send this 
        return  res.status(404).send("NOT FOUND")
    }

    if (note.user.toString() !== req.user.id) { 
        return res.status(401).send('Not a valid credentials')
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({'Success': 'Notes deleted', 'Note': note})
})

module.exports = router