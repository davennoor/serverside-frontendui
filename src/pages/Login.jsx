import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


function Login(){
const [form, setForm] = useState({
  email:"",
  password:""
});
const [loading,setLoading] = useState(false)
const [errormsg, setErrorMsg] = useState("")//+
const navigate = useNavigate()

const handleChange = (e) =>{
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  })
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  setLoading(true);
  setErrorMsg("") //reset error setiap submit baru

  try{
    const res = await axios.post('http://127.0.0.1:8000/api/login',form)
    localStorage.setItem('token',res.data.data.token);

    // SIMPAN NAMA USER (masuk ke objek user dulu)
    localStorage.setItem('user_name', res.data.data.name);//ini ai
    navigate('/itineraries');
  }
  catch(error){
    setErrorMsg(error.response?.data?.message || 'Login gagal') //set pesan error ke set
  }
  finally{
    setLoading(false)
  }
}
  return(
    <>
    {/* htmlForm */}
  <div className="auth-panel">
    <div className="auth-card">

      <div className="auth-card__header">
        <h1 className="auth-card__title">Sign In</h1>
        <p className="auth-card__subtitle">Enter your credentials to continue</p>
      </div>

      <form className="auth-card__body"  onSubmit={handleSubmit}>
        {/* Email field */}
        <div className="Form-group">
          <label className="Form-label" htmlFor="email">Email Address</label>
          <input
            className="Form-input"
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password field with error example */}
        <div className="Form-group" >
          <label className="Form-label" htmlFor="password">Password</label>
          <input
            className="Form-input Form-input--error"
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />
          {errormsg && (
            <span className="Form-error">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#c0392b" stroke-width="1.5"/>
              <path d="M6.5 4v3" stroke="#c0392b" stroke-width="1.5" stroke-linecap="square"/>
              <circle cx="6.5" cy="9" r="0.7" fill="#c0392b"/>
            </svg>
            {errormsg}
          </span>
          )}  
        </div>

        <button className="btn btn--primary btn--full" type="submit" disabled={loading}>
          {loading ? "Sign In..." : "Sign in"}
        </button>
      </form>

      <div className="auth-card__footer">
        <span>Don't have an account?</span>
        <Link to='/register'>Create one</Link>
      </div>

    </div>
  </div>
  </>
)}
export default Login
  