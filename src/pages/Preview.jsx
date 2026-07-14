import React from "react"
import { Link } from "react-router-dom"

function Preview(){
  return(
    <>
    <div className="preview-layout">

    {/* Top bar */}
    <div className="preview-topbar">
      <div className="preview-topbar__info">
        <span className="preview-topbar__badge">Preview</span>
        <span className="preview-topbar__title">Japan Spring Trip</span>
        <span className="preview-topbar__slug">/japan-spring-trip</span>
      </div>
      <Link to={'itineraries/:slug/builder'} className="btn btn--ghost btn--sm">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2L3 6.5 8 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
        </svg>
        Back to Builder
      </Link>
    </div>

    {/* Preview content */}
    <div className="preview-content">

      {/* Block 1: Trip Overview */}
      <div className="preview-section">
        <div className="preview-section__label">
          <span className="preview-section__num">01</span>
          <span className="preview-section__template-name">overview</span>
        </div>
        <div className="preview-section__body">
          <div className="preview-hero">
            <h1 className="preview-hero__title">Kyoto &amp; Tokyo, Japan</h1>
            <p className="preview-hero__subtitle">
              5 - 12 April 2026 · A 7-day journey through Japan during cherry blossom season.
            </p>
            <div>
              <button className="btn btn--primary" type="button">View Trip</button>
            </div>
            {/* No image URL provided — placeholder shown */}
            <div className="preview-hero__image-placeholder">
              No image URL provided
            </div>
          </div>
        </div>
      </div>

      {/* Block 2: Day Plan */}
      <div className="preview-section">
        <div className="preview-section__label">
          <span className="preview-section__num">02</span>
          <span className="preview-section__template-name">day-plan</span>
        </div>
        <div className="preview-section__body">
          <div className="preview-about">
            <div className="preview-about__image-placeholder">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="30" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="10" cy="11" r="3" stroke="currentColor" stroke-width="1.5"/>
                <path d="M1 22l8-7 6 5 5-4 11 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
              <span>day_photo</span>
            </div>
            <div className="preview-about__body">
              <div className="preview-about__label">Day 1</div>
              <h2 className="preview-about__heading">Arrival in Kyoto</h2>
              <p className="preview-about__description">
                Land at Kansai International Airport, take the Haruka express to Kyoto Station,
                check in, and spend the evening exploring Gion's old streets and trying local kaiseki cuisine.
              </p>
              <a href="#" className="btn btn--ghost btn--sm">See details →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Block 3: Activity List */}
      <div className="preview-section">
        <div className="preview-section__label">
          <span className="preview-section__num">03</span>
          <span className="preview-section__template-name">activities</span>
        </div>
        <div className="preview-section__body">
          <div className="preview-services">
            <div className="preview-services__heading">Planned Activities</div>
            <div className="preview-services__grid">

              <div className="preview-service-card">
                <div className="preview-service-card__icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3h16v16H3z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M7 11h8M11 7v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                  </svg>
                </div>
                <div className="preview-service-card__name">activity_1_name</div>
                <div className="preview-service-card__meta">activity_1_photo</div>
              </div>

              <div className="preview-service-card">
                <div className="preview-service-card__icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M11 7v4l3 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                  </svg>
                </div>
                <div className="preview-service-card__name">activity_2_name</div>
                <div className="preview-service-card__meta">activity_2_photo</div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Block 4: Accommodation */}
      <div className="preview-section">
        <div className="preview-section__label">
          <span className="preview-section__num">04</span>
          <span className="preview-section__template-name">accommodation</span>
        </div>
        <div className="preview-section__body">
          <div className="preview-hero-section">
            <div className="preview-hero-section__content">
              <h2 className="preview-hero-section__title">Hotel Granvia Kyoto</h2>
              <p className="preview-hero-section__subtitle">
                Karasuma Chuoguchi, Shimogyo Ward, Kyoto · Check-in: 5 April 2026, 15:00
              </p>
              <button className="btn btn--primary" type="button">View on Map →</button>
            </div>
            <div className="preview-hero-section__image-placeholder">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="30" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="10" cy="11" r="3" stroke="currentColor" stroke-width="1.5"/>
                <path d="M1 22l8-7 6 5 5-4 11 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
              <span>hotel_image</span>
            </div>
          </div>
        </div>
      </div>

      {/* Block 5: Transport */}
      <div className="preview-section">
        <div className="preview-section__label">
          <span className="preview-section__num">05</span>
          <span className="preview-section__template-name">transport</span>
        </div>
        <div className="preview-section__body">
          <div className="preview-contact">
            <div className="preview-contact__left">
              <h2 className="preview-contact__title">Getting Around</h2>
              <div className="preview-contact__details">
                <div className="preview-contact__detail">
                  <div className="preview-contact__detail-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3h14v10H1z" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M1 3l7 6 7-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
                    </svg>
                  </div>
                  <span className="preview-contact__detail-value">Shinkansen — Kyoto to Tokyo</span>
                </div>
                <div className="preview-contact__detail">
                  <div className="preview-contact__detail-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 2h4l1.5 3.5-2 1.5c.9 1.8 2.5 3.4 4.3 4.3l1.5-2L15 10.5V14c0 .6-.4 1-1 1C5.7 15 1 10.3 1 3c0-.6.4-1 1-1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span className="preview-contact__detail-value">Departure: 9 April 2026, 08:30</span>
                </div>
              </div>
            </div>
            <div className="preview-contact__map-placeholder">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3C11 3 7 7 7 12c0 7 9 17 9 17s9-10 9-17c0-5-4-9-9-9z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="16" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <span>route_map</span>
            </div>
          </div>
        </div>
      </div>

      {/* Block 6: Budget Summary */}
      <div className="preview-section">
        <div className="preview-section__label">
          <span className="preview-section__num">06</span>
          <span className="preview-section__template-name">budget</span>
        </div>
        <div className="preview-section__body">
          <div className="preview-about">
            <div className="preview-about__image-placeholder">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="30" stroke="currentColor" stroke-width="1.5"/>
                <path d="M6 22l6-8 5 5 5-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
              <span>chart_image</span>
            </div>
            <div className="preview-about__body">
              <div className="preview-about__label">Budget</div>
              <h2 className="preview-about__heading">Total: ¥285,000</h2>
              <p className="preview-about__description">
                Covers flights, accommodation, transport, and activities for two travelers.
                Currency: JPY. Note: meals and souvenirs are not included in this estimate.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    {/* /preview-content */}

  </div>
  </>
  )}
export default Preview