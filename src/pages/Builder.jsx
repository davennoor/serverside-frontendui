import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useState } from "react"

function Builder(){ 
  const [blocks, setBlocks] = useState([]);
  const [activeBlockId, setActiveBlockId] = useState(null);
  const	[newTemplateId,	setNewTemplateId]	=	useState('');
  const [blockToRemove, setBlockToRemove] = useState(null);
  const {slug} = useParams();

  const fetchBuilder = async() =>{
    const token = localStorage.getItem('token');
    if(!token) return;

    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/itineraries/${slug}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setBlocks(response.data.data.blocks);
    }
    catch(error){
      console.error('Error fetching data by slug',error)
      setBlocks([]);

    }
  }

  useEffect(() =>{
    fetchBuilder();
  }, [slug]);

  const klikBlock = (id) =>{
    setActiveBlockId(activeBlockId === id? null:id)
  }

  const handleSave = async (e, blockId, fields) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      fields: fields.map((f) => ({
        field_id: f.id,
        value: formData.get(String(f.id)) || ''
      }))
    };
    const token = localStorage.getItem('token');
    try{
      const res = await axios.put(`http://127.0.0.1:8000/api/itineraries/${slug}/blocks/${blockId}/fields`,payload,{
        headers:{Authorization:`Bearer ${token}`}
      }) 
    setBlocks((prev) => 
    prev.map((b) => (b.id === blockId ? {...b, fields: res.data.data.fields}:b)))
  }
    catch(error){
      console.error('Gagal menyimpan block', error);
      alert('Gagal menyimpan perubahan');
    }
  }

    const	confirmRemove	=	async	()	=>	{ 
        if(!blockToRemove) return;  
        const	token	=	localStorage.getItem('token'); 
        try	{ 
          await	axios.delete( `http://127.0.0.1:8000/api/itineraries/${slug}/blocks/${blockToRemove}`, 
            {	
              headers:	{	Authorization:	`Bearer	${token}`	}	
            }); 
            setBlocks((prev)	=>	prev.filter((b)	=>	b.id	!==	blockToRemove)); 
          }	
        catch	(error)	
        { 
          console.error('Gagal	menghapus	block',	error); 
          alert('Gagal	menghapus	block'); 
        }
        finally{
          setBlockToRemove(null);
        }
    };

    const handleRemove = (blockId) =>{
      setBlockToRemove(blockId);
    }

    const templateIdMap = {
    overview: 1,
    'day-plan': 2,
    activities: 3,
    accommodation: 4,
    transport: 5,
    budget: 6,
  };

    const	handleAddBlock	=	async	()	=>	{ 
      if	(!newTemplateId)	{ 
        alert('Pilih	template	dulu'); 
        return; 
      } 
      const	templateId	= templateIdMap[newTemplateId]; 
      if	(!templateId)	{ 
        alert('Template tidak ada'); 
        return; 
      } 
      const	token	=	localStorage.getItem('token'); 
      try	{ 
        const	res	=	await	axios.post( `http://127.0.0.1:8000/api/itineraries/${slug}/blocks`, 
          {	
            template_id:	templateId,	
            position:	blocks.length	+	1	
          }, 
          {	
            headers:	{	Authorization:	`Bearer	${token}`	}	
          }); 
          setBlocks((prev)	=>	[...prev,	res.data.data]); 
          setNewTemplateId(''); 
        }	
        catch	(error)	
        { 
          console.error('Gagal	menambah	block',	error); 
          alert('Gagal	menambah	block'); 
        }};

  return (
    <>
      <div className="app-layout">

    {/* <!-- Navbar --> */}
    <Navbar/>
    
    <div className="app-main">
      <div className="builder-layout"> 


        {/* <!-- ── MAIN CANVAS ── --> */}
        <div className="builder-main">

          {/* <!-- Toolbar --> */}
          <div className="builder-toolbar">
            <div className="builder-toolbar__left">
              <div className="builder-breadcrumb">
                <Link to={"/itineraries"}>Itineraries</Link>
                <span>→</span>
                <span>Japan Spring Trip</span>
              </div>
              <div className="builder-toolbar__divider"></div>
              <span className="tag">3 blocks</span>
            </div>
            <div className="navbar__actions"> 
              <Link to={'/itineraries/:slug/preview'} className="btn btn--ghost btn--sm">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6.5C1 6.5 3 2 6.5 2S12 6.5 12 6.5 10 11 6.5 11 1 6.5 1 6.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  <circle cx="6.5" cy="6.5" r="1.75" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                Preview
              </Link>
            </div>
          </div>

          {/* <!-- Canvas --> */}
          <div className="builder-canvas">

            {/* <!-- Field editor: Trip Overview Block (open/active) --> */}
            {blocks.map((itemblock,index) => {
              const isOpen = activeBlockId == itemblock.id;
              return(
              <div key={itemblock.id} className={`field-editor ${isOpen ? "field-editor--open" : ""}`} >
              <div className="field-editor__header" onClick={() => klikBlock(itemblock.id)}>
                <div>
                  <div className="field-editor__title">
                    <span className="tag">{index + 1}</span>
                    &nbsp; {itemblock.template.name}
                  </div>
                  <div className="field-editor__meta">Template: {itemblock.template.slug}</div>
                </div>
                <div className="field-editor__toggle">
                  <span>{isOpen? 'Collapse' : 'Expands'}</span>
                  <svg className="field-editor__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {isOpen? 
                  (
                    <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                  ):
                    <path d="M1 7l5-5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                  }
                  </svg>
                </div>
              </div>

              {isOpen && (
                <>
                <form	onSubmit={(e)	=>	handleSave(e,	itemblock.id,	itemblock.fields)}>
                <div className="field-editor__body">
                  {itemblock.fields?.map((field) => (
                <div className="form-group" key={field.id}>
                  <label className="form-label" htmlFor={`f-${field.id}`}>{field.name}</label>
                  <input
                    className="form-input"
                    type={field.type === 'url'?'url':'text'}
                    id={`f-${field.id}`}
                    name={field.id}
                    placeholder={`Enter ${field.name.toLowerCase()}`}
                    defaultValue={field.value}
                  />
                </div>
                ))}
              </div>
              <div className="field-editor__footer">
                <div className="shortcuts-hint">
                  <span className="kbd">Esc</span> to close
                </div>
                <div className="field-editor__footer-actions">
                  <button className="btn btn--ghost btn--sm" type="button" onClick={() => handleRemove(itemblock.id)}>Remove</button>
                  <button className="btn btn--primary btn--sm" type="submit">Save</button>
                </div>
              </div>
              </form>
              </>
              )}
            </div>
            
            
              
            );
            })} 

            {/* <!-- Add Block inline panel --> */}
            <div className="add-section-panel">
              <div className="add-section-panel__header">
                <span className="add-section-panel__title">Add Block</span>
              </div>
              <div className="form-wrap">
                <div className="form-group" style={{flex:1}}>
                  <label className="form-label" htmlFor="block-template">Block Template</label>
                  <select className="form-input" id="block-template" name="template_id" value={newTemplateId}
                  onChange={(e) => setNewTemplateId(e.target.value)}>
                    <option value="" disabled selected>Choose a template…</option>
                    <option value="overview">overview — Trip Overview Block</option>
                    <option value="day-plan">day-plan — Day Plan Block</option>
                    <option value="activities">activities — Activity List Block</option>
                    <option value="accommodation">accommodation — Accommodation Block</option>
                    <option value="transport">transport — Transport Block</option>
                    <option value="budget">budget — Budget Summary Block</option>
                  </select>
                </div>
                <button className="btn btn--primary" type="button" style={{alignSelf:'flex-start'}} onClick={handleAddBlock}>
                  Add
                </button>
              </div>
            </div>
            

          </div>
          {/* <!-- /canvas --> */}

        </div>
        {/* <!-- /builder-main --> */}

      </div>
    </div>

  </div>
          


   
  {blockToRemove && (
    <div className="modal-backdrop">
    <div className="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-remove-title">
      <div className="modal__header">
        <h2 className="modal__title" id="modal-remove-title">Remove Block</h2>
        <button className="modal__close" type="button" aria-label="Close" onClick={() => setBlockToRemove(null)}>✕</button>
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
          Remove <strong>"Trip Overview"</strong> from this itinerary?<br />
          This action cannot be undone.
        </p>
      </div>
      <div className="modal__footer">
        <button className="btn btn--ghost" type="button" onClick={() => setBlockToRemove(null)}>Cancel</button>
        <button className="btn btn--danger" type="button" onClick={() => confirmRemove()}>Ok, Remove</button>
      </div>
    </div>
  </div>
  )}
    </>
    
)}
export default Builder
