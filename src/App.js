import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/NoteState";

function App() {
  return (<>
    <>
      <NoteState>
        <Router>
          {/* Navbar */}
          <Navbar />


          <div className="Router">
            <Routes>

              <Route exact path="/home" element={[<Home />]} />
              <Route exact path="/" element={[<Navbar />]} />
              <Route exact path="/about" element={[<About />]} />

            </Routes>
          </div>
        </Router>
      </NoteState>

    </>
  </>
  );
}

export default App;
