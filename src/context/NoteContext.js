import { createContext } from "react";

//Creating a context
const noteContext = createContext();            

export default noteContext;


/**
 * How to context api 
 * 
 * 1> pahle kisi var ko createContext() banao  let us say var is noteContext
 * 2> phir isko provide karne ke liye privider chahiye hoga         <noteContext.Provider ></noteContext.Provider>
 * 
 * phir iske value me state or setstate de do bas               <noteContext.Provider value={state, setstate}></noteContext.Provider>
 * 
 * Aur useEffect ka use karte hue iska use kar lo kisi component me 
 */