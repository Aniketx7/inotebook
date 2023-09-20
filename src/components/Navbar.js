import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  // useLocation: if click or target any element in this component, give some information about target element
  let location = useLocation();         //This is react-router-dom propeties

  React.useEffect(() => {
    console.log(location.pathname)
  }, [location]);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
        <Link className="navbar-brand" to="/" >iNotebook</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item ">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">about</Link>
            </li>

          </ul>
          <form className="d-flex-end">
           <Link className="btn btn-primary mx-2 " to="/login" role='button' >Login</Link>
           <Link className="btn btn-primary mx-2 " to="/signup" role='button' >Signup</Link>
          </form>
        </div>  
      </nav>
      </>
  )
}

export default Navbar