import React, { useContext } from 'react'
import noteContext from '../context/NoteContext'
import NotesItem from './NotesItem'
import AddNote from './AddNote.js'


function Notes() {
    const context = useContext(noteContext)
    const { Note, addNote } = context

    return (
        <>
            <AddNote />
            <div className="mb-3">
                <p>Note</p>
                <div className="container noteContainer" style={{display: "flex", flexWrap: "wrap"}}>
                    {Note.map((note) => {        //map kya karega Note me jitne bhi cheeze hai use lega 
                        return <NotesItem key={note._id} note={note} />  //note ke value ko note kar diye 
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes