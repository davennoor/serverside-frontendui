import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function Itineraries() {
  // ---------------------------------------------------------------------------
  // 1. STATES & ROUTING HOOKS
  // ---------------------------------------------------------------------------
  const [itineraries, setItineraires] = useState([]);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEditingSlug, setCurrentEditingSlug] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState("");
  const [titleToDelete, setTitleToDelete] = useState("");
  
  // States untuk Form New/Add Itinerary
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formSummary, setFormSummary] = useState("");
  
  const navigate = useNavigate();
  const { slug } = useParams();

  // ---------------------------------------------------------------------------
  // 2. DATA FETCHING (API GET)
  // ---------------------------------------------------------------------------
  const fetcItineraries = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get('http://127.0.0.1:8000/api/itineraries', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItineraires(res.data.data.itineraries);
    } catch (error) {
      console.error('Error fetching itineraies data', error);
      setItineraires([]);
    }
  };

  // Panggil fetch pertama kali saat komponen di-mount
  useEffect(() => {
    fetcItineraries();
  }, []);

  // ---------------------------------------------------------------------------
  // 3. KEYBOARD SHORTCUTS & EVENT LISTENERS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + N -> Buka modal
      if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsItineraryOpen(true);
      }
      // Esc -> Tutup modal
      if (e.key === 'Escape') {
        setIsItineraryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ---------------------------------------------------------------------------
  // 4. HELPER FUNCTIONS & FORM INPUT HANDLERS
  // ---------------------------------------------------------------------------
  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "") // Hapus karakter aneh selain huruf, angka, spasi, & strip
      .replace(/\s+/g, "-")       // Ganti spasi dengan tanda minus (-)
      .replace(/-+/g, "-")        // Kurangi jika ada tanda minus beruntun (e.g. --- jadi -)
      .trim();                    // Bersihkan spasi di ujung kiri/kanan
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormTitle(value);
    setFormSlug(convertToSlug(value)); // Auto-generated slug
  };

  // ---------------------------------------------------------------------------
  // 5. DATA MUTATION (API POST - ADD ITINERARY)
  // ---------------------------------------------------------------------------
  const Save = async (e) => {
    e.preventDefault();

    // Validasi sederhana agar input wajib tidak kosong
    if (!formTitle.trim() || !formSlug.trim()) {
      alert("Title dan Slug wajib diisi!");
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Ambil token login
      
      const payload = {
        title: formTitle,
        slug: formSlug,
        summary: formSummary
      };

      // Request POST ke Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/itineraries', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === 'success' || response.status === 201) {
        alert("Itinerary berhasil disimpan!");
        
        // 1. Reset isi form modal kembali kosong
        setFormTitle("");
        setFormSlug("");
        setFormSummary("");
        
        // 2. Tutup modalnya
        setIsItineraryOpen(false);
        
        // 3. Ambil data terbaru (nama fungsi disesuaikan dengan 'fetcItineraries' di atas)
        fetcItineraries();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal menyimpan itinerary");
    }
  };

  const handleEditClick = (itineraryData) => {
  // 1. Masukkan data lama ke state form agar muncul di input modal
  setFormTitle(itineraryData.title);
  setFormSlug(itineraryData.slug);
  setFormSummary(itineraryData.summary || "");

  // 1b. SIMPAN SLUG ASLI DARI DATABASE KE STATE BARU
  setCurrentEditingSlug(itineraryData.slug);

  // 2. Tandai bahwa modal sekarang dalam mode Edit
  setIsEditOpen(true); 

  // 3. Buka modalnya
  setIsItineraryOpen(true); 
};

  const Update = async(e) =>{
    e.preventDefault();
    // Validasi sederhana agar input wajib tidak kosong
    if (!formTitle.trim() || !formSlug.trim()) {
      alert("Title dan Slug wajib diisi!");
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Ambil token login
      
      const payload = {
        title: formTitle,
        slug: formSlug,
        summary: formSummary
      };

      // Request POST ke Laravel
      const response = await axios.put(`http://127.0.0.1:8000/api/itineraries/${currentEditingSlug}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === 'success' || response.status === 201) {
        alert("Itinerary berhasil diupdate!");

        setIsItineraryOpen(false);
        
        fetcItineraries();
      }
    } 
    catch (error) {
      alert(error.response?.data?.message || "Gagal menyimpan itinerary");
    }
  }

  const handleDeleteClick = (itinerary) => {
  setSlugToDelete(itinerary.slug);
  setTitleToDelete(itinerary.title); // Agar nama itinerary muncul di modal confirm-dialog
  setIsDeleteOpen(true); // Buka modalnya
};

  const Delete = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:8000/api/itineraries/${slugToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.data.status === 'success' || response.status === 200) {
        alert("Itinerary berhasil dihapus!");
        setIsDeleteOpen(false);
        // Bersihkan state temporer
        setSlugToDelete("");
        setTitleToDelete("");
        fetcItineraries();
      }
    }
      catch(error){
        alert(error.response?.data?.message || "Gagal Menghapus dari sini:p")
      }
    }

    return(
        <>
        <div className="app-layout">
          <Navbar />
    {/* Navbar 
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
          {itineraries.length > 0 ? itineraries[0].user?.name : 'Loading...'}
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
    */}

    <main className="app-main">
      <div className="page-container">

        {/* Page Header */}
        <div className="page-header">
          <div className="page-header__left">
            <h1 className="page-title">My Itineraries</h1>
            <p className="page-subtitle">3 itineraries · plan and organize your trips</p>
          </div>
          <div>
            <button className="btn btn--primary" type="button" onClick={() => setIsItineraryOpen(true)}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
              New Itinerary
              <span className="kbd">Alt+N</span>
            </button>
          </div>
        </div>

         {/* Itineraries List  */}
        <div className="pages-grid">

          {itineraries.length == 0 ? (
            <p>Belum ada itinerary. Silakan buat baru!</p>
          ):(
          itineraries.map((data) => 
            <div className="page-item" key={data.id}>
            <div className="page-item__info">
              <span className="page-item__title">
                <Link to='/itineraries/${data.slug}/builder'>{data.title}</Link>
                <span className="page-item__title-arrow">→</span>
              </span>
              <div className="page-item__meta">
                <span className="page-item__slug">/{data.slug}</span>
                <span className="page-item__summary">{data.summary}</span>
              </div>
            </div>
            <div className="page-item__actions">
              <Link to={`/itineraries/${data.slug}/builder`}  className="btn btn--ghost btn--sm">
                Build
              </Link>
              <button className="btn btn--ghost btn--sm" type="button" onClick={() => handleEditClick(data)}>
                Edit
              </button>
              <button className="btn btn--danger btn--sm" type="button" onClick={() => handleDeleteClick(data)}>
                Delete
              </button>
            </div>
          </div>
          )
          )}
        </div>
      </div>
    </main>

  </div>


    {/* ======================================================
       MODAL: Create / Edit Itinerary
    ====================================================== */}
  <div className={`modal-backdrop ${isItineraryOpen ? "" : "hidden"}`}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-create-title">
    <form onSubmit={isEditOpen ? Update : Save}>
      <div className="modal__header">
        <h2 className="modal__title" id="modal-create-title">New Itinerary</h2>
        <button className="modal__close" type="button" aria-label="Close" onClick={()=> setIsItineraryOpen(false)}>✕</button>
      </div>

      <div className="modal__body">

        <div className="form-group">
          <label className="form-label" htmlFor="new-title">Title</label>
          <input
            className="form-input"
            type="text"
            id="new-title"
            name="title"
            placeholder="e.g. Japan Spring Trip"
            value={formTitle}
            onChange={handleTitleChange} // Panggil fungsi auto-slug di sini
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="new-slug">Slug</label>
          <input
            className="form-input"
            type="text"
            id="new-slug"
            name="slug"
            placeholder="e.g. japan-spring-trip"
            value={formSlug}
            onChange={(e) => setFormSlug(convertToSlug(e.target.value))} // Tetap izinkan edit manual tapi tetap aman berformat slug
          />
          <span className="form-hint">Auto-generated from title. Lowercase, no spaces.</span>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="new-summary">Summary <span className="form-hint">(optional)</span></label>
          <textarea
            className="form-input"
            id="new-summary"
            name="summary"
            placeholder="Brief description of this trip…"
            value={formSummary}
            onChange={(e) => setFormSummary(e.target.value)}
          ></textarea>
        </div>

      </div>

      <div className="modal__footer">
        <button className="btn btn--ghost" type="button" onClick={() => setIsItineraryOpen(false)}>Cancel</button>
        <button className="btn btn--primary" type="submit">{isEditOpen ? 'Update Itinerary' : 'Save Itinerary'}</button>
      </div>
    </form>
    </div>
  </div>


    {/* ======================================================
       MODAL: Confirm Delete
    ======================================================  */}
  
  <div className={`modal-backdrop ${isDeleteOpen ? "" : "hidden"}`}>
    <div className="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-delete-title">

      <div className="modal__header">
        <h2 className="modal__title" id="modal-delete-title">Delete Itinerary</h2>
        <button className="modal__close" type="button" aria-label="Close" onClick={() => setIsDeleteOpen(false)}>✕</button>
      </div>

      <div className="modal__body">
        <div className="confirm-dialog__icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4v7" stroke="#c0392b" stroke-width="2" stroke-linecap="square"/>
            <circle cx="11" cy="16" r="1" fill="#c0392b"/>
            <path d="M3 19L11 3l8 16H3z" stroke="#c0392b" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>
        <p className="confirm-dialog__text">
          Are you sure you want to delete <strong>{titleToDelete}</strong>?<br/>
          This action cannot be undone.
        </p>
      </div>

      <div className="modal__footer">
        <button className="btn btn--ghost" type="button" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
        <button className="btn btn--danger" type="button" onClick={Delete}>Ok, Delete</button>
      </div>
    </div>
  </div>
  
  </>
)}
export default Itineraries