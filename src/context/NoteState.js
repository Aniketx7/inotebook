import { useState } from "react";
import NoteContext from "./NoteContext";
import { alertContext } from "./NoteContext";

const NoteState = (props) => {
    const notes = 
        [
            {
              "_id": "64f35f650a6378de04ade499",
              "user": "64e4d8cfaf866deb74aa520a",
              "title": "workout 1",
              "description": "push ups",
              "tag": "General",
              "timeStamp": "2023-09-02T16:14:29.972Z",
              "__v": 0
            },
            {
              "_id": "64f35f6d0a6378de04ade49b",
              "user": "64e4d8cfaf866deb74aa520a",
              "title": "workout 1",
              "description": "pull ups",
              "tag": "General",
              "timeStamp": "2023-09-02T16:14:37.762Z",
              "__v": 0
            },
            {
              "_id": "64f35f7d0a6378de04ade49d",
              "user": "64e4d8cfaf866deb74aa520a",
              "title": "workout 2",
              "description": "Squats",
              "tag": "General",
              "timeStamp": "2023-09-02T16:14:53.156Z",
              "__v": 0
            }
          ]
    
    const [Note, setNote] = useState(notes)
    
  
    return (
        // NoteContext ko provider karne ke liye provider chahiye hoga 
        <NoteContext.Provider value={{Note, setNote}}>{props.children}</NoteContext.Provider>
        // Value me State aur update func (contains setState) de diye 
    )
}

export default NoteState