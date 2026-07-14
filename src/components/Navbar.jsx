import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar(){
  const [userName, setUserName] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    // Langsung ambil nama yang disimpan dari proses login tadi
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      setUserName(savedName);
    }
  }, []); // Cukup dijalankan sekali saat navbar muncul

  const handleLogout = async () => {
      const confirmLogout = window.confirm("Yakin ingin Logout?");
      if (!confirmLogout) return;
  
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user_name')
        navigate('/login');
      }
      catch(error){
        console.error(error); // <- fix: sebelumnya salah tulis 'err'
        alert(error.response?.data?.message || "Gagal Logout dari sini:p")
      }
    }


    return(
        <>
    {/* Navbar */}
    <nav className="navbar">
      <a href="itineraries.html" className="navbar__brand"> 
        TripPlanner
      </a>
      <div className="navbar__actions">
        <button className="navbar__menu-toggle" type="button" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to={'/itineraries/:slug/preview'} className="btn btn--ghost btn--sm" type="button">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M1 12c0-2.485 2.462-4.5 5.5-4.5S12 9.515 12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
          </svg>
          {userName}
        </Link>
        <button className="btn btn--ghost btn--sm" type="button" onClick={handleLogout}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1h3v1.5L9.5 4h2V11H1.5V4h2L5 2.5V1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M9 7.5L7 9.5l-2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </nav>
    </>
    )
}

export default Navbar;

// const navigate = useNavigate();
  // const handleLogout = async() => {
  //   const confirmLogout = window.confirm("Yakin ingin Logout?");
  //   if(!confirmLogout) return;
  

  // try{
  //   const token = localStorage.getItem('token');
  //   await axios.post('http://127.0.0.1:8000/api/logout',{},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,}
  //     },
  //   )
  // localStorage.removeItem('token');
  // navigate('/login')
  // }
  // catch(error){
  //   console.error(err);
  //   alert(error.response?.data?.message || "Gagal Logout dari sini:p")
  // }