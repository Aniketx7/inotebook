import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/NoteContext'
import NotesItem from './NotesItem'
import AddNote from './AddNote.js'


function Notes() {
    const context = useContext(noteContext)
    const { Note, getNotes } = context
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, []);


    const ref = useRef(null)
    const [note, setNote] = useState({ Etitle: "", Edescription: "", Etag: "" })
    const updateNote = (currentNote) => {
        console.log("updateNote", note)
        console.log('You can now Edit note')
        setNote({ Etitle: currentNote.title, Edescription: currentNote.description, Etag: currentNote.tag })

        ref.current.click()
    }



    const handleClick = (e) => {
        e.preventDefault();
        // addNote(note.Title, note.Description, note.tag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />


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
                                    <input type="text" className="form-control" id="Etitle" name="ETitle" aria-describedby="emailHelp" value={note.Etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="Edescription" name="EDescription" value={note.Edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="Etag" name="Etag" value={note.Etag} onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
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