import React, { useContext } from 'react'
// import NotesItem from './NotesItem'
import Notes from './Notes'

function Home() {

  return (
    <>
      <div className="container">
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Title</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Input Title" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <Notes />
      </div>
    </>
  )
}

export default Home