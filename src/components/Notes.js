import React, { useContext } from 'react'
import noteContext from '../context/NoteContext'
import NotesItem from './NotesItem'


function Notes() {
    const notes = useContext(noteContext)
    const { Note, setNote } = notes

    return (
        <>
            <div className="mb-3">
                <p>Note</p>
                {Note.map((note) => {        //map kya karega Note me jitne bhi cheeze hai use lega 
                    return <NotesItem note = {note}/>  //note ke value ko note kar diye 
                })}
            </div>
        </>
    )
}

export default Notes