
import React, { useContext, useEffect } from 'react'
import noteContext from '../context/NoteContext'

function About() {
  const example = useContext(noteContext)
  useEffect(() => {
    example.update()
  }, [])

  return (
    <div>Hii, myself {example.State.Name}, age: {example.State.Age}</div>
  )
}

export default About