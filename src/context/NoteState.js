import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [Note, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGQ4Y2ZhZjg2NmRlYjc0YWE1MjBhIn0sImlhdCI6MTY5Mjg5NDMwMn0.fKBHAiR1AN94GBOYAdGBzoIbnpWk6LHDAExP9gBEgHQ"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGQ4Y2ZhZjg2NmRlYjc0YWE1MjBhIn0sImlhdCI6MTY5Mjg5NDMwMn0.fKBHAiR1AN94GBOYAdGBzoIbnpWk6LHDAExP9gBEgHQ"
      },
      body: JSON.stringify({ title, description })
    });
    const note = await response.json()
    setNotes(Note.concat(note))


  }

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    const newNotes = Note.filter((note) => { return note._id !== id })
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGQ4Y2ZhZjg2NmRlYjc0YWE1MjBhIn0sImlhdCI6MTY5Mjg5NDMwMn0.fKBHAiR1AN94GBOYAdGBzoIbnpWk6LHDAExP9gBEgHQ"
      },
    });
    const json = response.json();
    console.log('Note deleted', json);

    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGQ4Y2ZhZjg2NmRlYjc0YWE1MjBhIn0sImlhdCI6MTY5Mjg5NDMwMn0.fKBHAiR1AN94GBOYAdGBzoIbnpWk6LHDAExP9gBEgHQ"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(Note))
    for (let index = 0; index < newNotes.length; index++) {
      const element = Note[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ Note, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;