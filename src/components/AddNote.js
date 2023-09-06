import React, { useContext, useState } from 'react'
import noteContext from '../context/NoteContext'

function AddNote() {
  const context = useContext(noteContext)
  const { addNote } = context

  const [titleDescp, setTitleDescp] = useState({ title: "ff", description: "dd" })
  const onChange = (e) => {
    setTitleDescp({ ...titleDescp, [e.target.name]: [e.target.value] })   //target element ka name use value ke barabar
  }
  const handleClick = (e) => {
    e.preventDefault()
    addNote(titleDescp.Title, titleDescp.Description)     //Ye jo  "Title" wo title field ka name hai jo ham setIteleDescp me kiye hue hai e.target.name isi liye
    // addNote(titleDescp)
  }


  return (

    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="Title" placeholder="Your Title" onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" id="description" name='Description' rows="3" onChange={onChange}></textarea>
      </div>
      <button type="submit" class="btn btn-primary" onClick={handleClick}>Submit</button>
    </>
  )
}

export default AddNote