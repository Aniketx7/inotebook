import React, { useContext } from 'react'
import noteContext from '../context/NoteContext'


function NotesItem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note } = props        //Props ka naam ab note kar diye, just of because Notes.js me ham <NotesItem note={}/> se hi kar rahe hai 
    return (
        <div className="card row-md-3 mx-3 my-3" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id) }}></i>
                <i className="fa-regular fa-pen-to-square mx-4 "></i>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}

export default NotesItem