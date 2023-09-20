import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  //useState for credentials which user enter
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate()    //used to redirect from one router to another

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Fetching Login endpoints
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json()
      console.log(json)
      if (json.success) {   //If json.success is true then 
        localStorage.setItem('token', json.authtoken);      // save authtoken to localStorage
        navigate('/')                                     //And redirect to router '/'
      }
      else {
        console.log('Not a valid credentials')
      }
    } catch (error) {
      console.log(error)
    }

  }

  const onChange = (e) => {           //If any changes occur,
    setCredentials({ ...credentials, [e.target.name]: e.target.value })   //credentials useState ko set kare ki target element ka name uske value(value matlab prompt) ke equal ho jaye
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-groupmy-3" >
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' placeholder="Enter email" onChange={onChange} value={credentials.email} />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group my-3">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} value={credentials.password} />
      </div>
      <button type="submit" className="btn btn-primary my-3">Submit</button>
    </form>
  )
}

export default Login