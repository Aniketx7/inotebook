import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const istate = {
        "Name": "Yash",
        "Age": "14  "
    }
    const [State, setState] = useState(istate)
    const update = () => {
        // setTimeout(() => {
            setState({
                "Name": "Aniket",
                "Age": "16"
            })

    //     }, 1000);
    }
    return (
        // NoteContext ko provider karne ke liye provider chahiye hoga 
        <NoteContext.Provider value={{State, update}}>{props.children}</NoteContext.Provider>
        // Value me State aur update func (contains setState) de diye 
    )
}

export default NoteState