import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Register(){
  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  })
const [erroremail, setErrorEmail] = useState("")
const [errorpasword, setErrorPassword] = useState("")
const navigate = useNavigate();

const handleChange = (e) => {
  setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e) =>{
  e.preventDefault()
  setErrorEmail("")
  setErrorPassword("")

  try{
    const res = await axios.post('http://127.0.0.1:8000/api/register',form)
    localStorage.setItem('token',res.data.data.token);
    navigate('/itineraries');
  }
  catch(error){
  console.log("FULL ERROR OBJECT:", error);
  console.log("error.message:", error.message);
  console.log("error.code:", error.code);
  console.log("error.response:", error.response);
  console.log("error.request:", error.request);
  
  const message = error.response?.data?.message || "";
  const errors = error.response?.data?.errors;

  if (errors?.email) {
    setErrorEmail(errors.email[0]);
  } else if (message.toLowerCase().includes("email")) {
    setErrorEmail(message);
  }

  if (errors?.password) {
    setErrorPassword(errors.password[0]);
  } else if (message.toLowerCase().includes("password")) {
    setErrorPassword(message);
  }

  if (!errors && !message.toLowerCase().includes("email") && !message.toLowerCase().includes("password")) {
    setErrorEmail(message || "Registration failed");
  }
}
}

  return(
    <>
    {/* Form */}
  <div className="auth-panel auth-panel--right">
    <div className="auth-card">

      <div className="auth-card__header">
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Start planning your trips today</p>
      </div>

      <form className="auth-card__body" onSubmit={handleSubmit}>

        {/* Name field */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Email field with error example */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            className={`form-input ${erroremail ? 'form-input--error' : ''}`}
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
          {erroremail && (
            <span className="form-error">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#c0392b" stroke-width="1.5"/>
              <path d="M6.5 4v3" stroke="#c0392b" stroke-width="1.5" stroke-linecap="square"/>
              <circle cx="6.5" cy="9" r="0.7" fill="#c0392b"/>
            </svg>
            {erroremail}
          </span>
          )}
          
        </div>

        {/* Password field */}
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
          />
          <span className="form-hint">Minimum 6 characters</span>
          {errorpasword && (
            <span className="Form-error">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#c0392b" stroke-width="1.5"/>
              <path d="M6.5 4v3" stroke="#c0392b" stroke-width="1.5" stroke-linecap="square"/>
              <circle cx="6.5" cy="9" r="0.7" fill="#c0392b"/>
            </svg>
            {errorpasword}
          </span>
          )}  
        </div>

        <button className="btn btn--primary btn--full" type="submit">
          Create Account
        </button>

      </form>

      <div className="auth-card__footer">
        <span>Already have an account?</span>
        <Link to='/login'>Sign in</Link>
      </div>

    </div>
  </div> 
    </>
  )}
export default Register
