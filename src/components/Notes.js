import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/NoteContext'
import NotesItem from './NotesItem'
import AddNote from './AddNote.js'


function Notes() {
    const context = useContext(noteContext)
    const { Note, getNotes, editNote } = context
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, []);


    const ref = useRef(null)        ///useRef is used to give reference to one element
    const [note, setNote] = useState({ id: "", Etitle: "", Edescription: "", Etag: "" })        //Initially all will empty
    const updateNote = (currentNote) => {
        console.log("updateNote", note)
        console.log('You can now Edit note')

        // Important: Now, onChange ki se jo bhi name uska value ho jayega ( like title: uska value, description: uska value...etc) then useState me note ki jagah hamara edit note wala value set ho jayega ab     ham jo currentNote(a actual note la rahe hai) usko set karenge ki uska title mere value wale title ke equal ... and so on.

        setNote({ id: currentNote._id, Etitle: currentNote.title, Edescription: currentNote.description, Etag: currentNote.tag })       //on change ki vajah se hamara edit note wala value note useState me set ho jayega,  Now ab currentNote(actual note ) uska state change kar denge...


        ref.current.click()
    }


    const refClose = useRef(null)
    const handleClick = (e) => {
        e.preventDefault();
        //when its clicked, editNote functionality in NoteState uska argument ye ho jayega 
        editNote(note.id, note.Etitle, note.Edescription, note.Etag)            //Hamara note useState ka id uska id, noteUsestate ka title uska title

        refClose.current.click()
    }

    const onChange = (e) => {           //If any changes occur,
        setNote({ ...note, [e.target.name]: e.target.value })   //note useState ko set kare ki target element ka name uske value(value matlab prompt) ke equal ho jaye
    }
    return (
        <>
            <AddNote />


            {/* Edit note functionality */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">



                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="Etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="Etitle" name="Etitle" value={note.Etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="Edescription" name="Edescription" value={note.Edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="Etag" name="Etag" value={note.Etag} onChange={onChange} />
                                </div>
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mb-3">
                <p>Note</p>
                <div className="container noteContainer" style={{ display: "flex", flexWrap: "wrap" }}>
                    {Note.map((note) => {        //map kya karega Note me jitne bhi cheeze hai use lega 
                        return <NotesItem key={note._id} note={note} updatenote={updateNote} />  //note ke value ko note kar diye 
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes