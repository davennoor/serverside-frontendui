import React from "react"
import { Link } from "react-router-dom"

function Builder(){ 
  return (
    <>
      <div className="app-layout">

    {/* <!-- Navbar --> */}
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
        <Link to={'/itineraries/:slug/preview'} className="btn btn--ghost btn--sm" type="button" >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M1 12c0-2.485 2.462-4.5 5.5-4.5S12 9.515 12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
          </svg>
          John Doe
        </Link>
        <button className="btn btn--ghost btn--sm" type="button">Logout</button>
      </div>
    </nav>

    <div className="app-main">
      <div className="builder-layout"> 


        {/* <!-- ── MAIN CANVAS ── --> */}
        <div className="builder-main">

          {/* <!-- Toolbar --> */}
          <div className="builder-toolbar">
            <div className="builder-toolbar__left">
              <div className="builder-breadcrumb">
                <a href="itineraries.html">Itineraries</a>
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
            <div className="field-editor field-editor--open">
              <div className="field-editor__header">
                <div>
                  <div className="field-editor__title">
                    <span className="tag">01</span>
                    &nbsp; Trip Overview
                  </div>
                  <div className="field-editor__meta">template: overview</div>
                </div>
                <div className="field-editor__toggle">
                  <span>Collapse</span>
                  <svg className="field-editor__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                  </svg>
                </div>
              </div>
              <div className="field-editor__body">
                <div className="form-group">
                  <label className="form-label" for="f-overview-destination">Destination</label>
                  <input
                    className="form-input"
                    type="text"
                    id="f-overview-destination"
                    placeholder="Enter destination…"
                    value="Kyoto & Tokyo, Japan"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" for="f-overview-dates">Trip Dates</label>
                  <input
                    className="form-input"
                    type="text"
                    id="f-overview-dates"
                    placeholder="Enter trip dates…"
                    value="5 - 12 April 2026"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" for="f-overview-image">Cover Image URL</label>
                  <input
                    className="form-input"
                    type="url"
                    id="f-overview-image"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="field-editor__footer">
                <div className="shortcuts-hint">
                  <span className="kbd">Esc</span> to close
                </div>
                <div className="field-editor__footer-actions">
                  <button className="btn btn--ghost btn--sm" type="button">Remove</button>
                  <button className="btn btn--primary btn--sm" type="button">Save</button>
                </div>
              </div>
            </div>

            {/* <!-- Field editor: Day Plan Block (collapsed) --> */}
            <div className="field-editor">
              <div className="field-editor__header">
                <div>
                  <div className="field-editor__title">
                    <span className="tag">02</span>
                    &nbsp; Day Plan
                  </div>
                  <div className="field-editor__meta">template: day-plan · 3 fields</div>
                </div>
                <div className="field-editor__toggle">
                  <span>Expand</span>
                  <svg className="field-editor__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7l5-5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* <!-- Field editor: Budget Summary Block (collapsed) --> */}
            <div className="field-editor">
              <div className="field-editor__header">
                <div>
                  <div className="field-editor__title">
                    <span className="tag">03</span>
                    &nbsp; Budget Summary
                  </div>
                  <div className="field-editor__meta">template: budget · 4 fields</div>
                </div>
                <div className="field-editor__toggle">
                  <span>Expand</span>
                  <svg className="field-editor__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7l5-5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* <!-- Add Block inline panel --> */}
            <div className="add-section-panel">
              <div className="add-section-panel__header">
                <span className="add-section-panel__title">Add Block</span>
              </div>
              <div className="form-wrap">
                <div className="form-group" style="flex:1">
                  <label className="form-label" for="block-template">Block Template</label>
                  <select className="form-input" id="block-template" name="template_id">
                    <option value="" disabled selected>Choose a template…</option>
                    <option value="overview">overview — Trip Overview Block</option>
                    <option value="day-plan">day-plan — Day Plan Block</option>
                    <option value="activities">activities — Activity List Block</option>
                    <option value="accommodation">accommodation — Accommodation Block</option>
                    <option value="transport">transport — Transport Block</option>
                    <option value="budget">budget — Budget Summary Block</option>
                  </select>
                </div>
                <button className="btn btn--primary" type="button" style="align-self:flex-start">
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


  {/* { <!-- ======================================================
       MODAL: Confirm Remove Block
       ====================================================== -->
  } */}
  <div className="modal-backdrop">
    <div className="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-remove-title">
      <div className="modal__header">
        <h2 className="modal__title" id="modal-remove-title">Remove Block</h2>
        <button className="modal__close" type="button" aria-label="Close">✕</button>
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
        <button className="btn btn--ghost" type="button">Cancel</button>
        <button className="btn btn--danger" type="button">Ok, Remove</button>
      </div>
    </div>
  </div>
  {/* { --> } */}
    </>
    
)}
export default Builder
