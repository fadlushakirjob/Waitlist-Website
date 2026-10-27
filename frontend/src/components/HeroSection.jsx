import React, { useState } from 'react';
import {
  Mail,
  ArrowRight,
  Bus,
  Ticket,
  Bot,
  Activity,
  Users,
  MapPin,
  Smartphone,
} from 'lucide-react';

export default function HeroSection({ onQuickSubmit, stats }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      onQuickSubmit(email);
    }
  };

  const displayCount = stats?.public_display_count
    ? Number(stats.public_display_count).toLocaleString()
    : '10,000+';

  return (
    <section
      id="home"
      className="position-relative bg-white"
      style={{
        paddingTop: 'clamp(5.25rem, 10vw, 6.75rem)',
        paddingBottom: 'clamp(2rem, 5vw, 3rem)',
      }}
    >
      <div className="tz-container">
        {/* HERO ROW: Left Content & Right Visual */}
        <div className="row align-items-center gx-lg-5 gy-4 mb-4">
          {/* LEFT COLUMN: Headlines, Form, Feature Icons */}
          <div className="col-lg-6">
            {/* Main Headline */}
            <h1
              className="fw-extrabold mb-3"
              style={{
                fontSize: 'clamp(1.95rem, 5vw, 3.25rem)',
                lineHeight: 1.18,
                color: '#111827',
                letterSpacing: '-0.75px',
                fontWeight: 800,
              }}
            >
              A Smarter Way to <br />
              <span style={{ color: '#111827' }}>Travel in </span>
              <span style={{ color: '#ED1C24' }}>Kerala</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-secondary mb-4"
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                color: '#4B5563',
                maxWidth: '520px',
              }}
            >
              Real-time bus tracking, digital ticketing, AI travel assistant and more —
              all in one platform. Join the waitlist and be the first to experience TravelZync.
            </p>

            {/* Email Input & Join Waitlist Button */}
            <form onSubmit={handleSubmit} className="mb-2" style={{ maxWidth: '480px' }}>
              <div
                className="d-flex align-items-center p-1.5 rounded-pill bg-white border shadow-sm"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div
                  className="d-flex align-items-center flex-grow-1 ps-2 ps-sm-3"
                  style={{ minWidth: 0 }}
                >
                  <Mail size={18} className="text-muted me-2 flex-shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="form-control border-0 shadow-none p-0 text-dark"
                    style={{
                      fontSize: '0.925rem',
                      minWidth: 0,
                      background: 'transparent',
                    }}
                    id="hero-email-input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-tz-primary px-3 py-2 text-nowrap flex-shrink-0"
                  id="hero-join-waitlist-btn"
                  style={{ fontSize: '0.875rem' }}
                >
                  <span>Join Waitlist</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>

            <div className="text-muted small ps-2 mb-4" style={{ fontSize: '0.8rem' }}>
              Get early access, product updates and exclusive offers.
            </div>

            {/* 4 Quick Feature Icons Row (2x2 on mobile for perfect spacing, 1x4 on desktop) */}
            <div className="row g-3 g-sm-2 pt-1" style={{ maxWidth: '520px' }}>
              <div className="col-6 col-sm-3 text-center">
                <div
                  className="rounded-circle mx-auto p-2 d-flex align-items-center justify-content-center text-white mb-1.5 shadow-2xs"
                  style={{ backgroundColor: '#ED1C24', width: '34px', height: '34px' }}
                >
                  <Bus size={17} />
                </div>
                <div className="fw-semibold text-dark" style={{ fontSize: '0.75rem', lineHeight: 1.25 }}>
                  Real-time <br /> Bus Tracking
                </div>
              </div>

              <div className="col-6 col-sm-3 text-center">
                <div
                  className="rounded-circle mx-auto p-2 d-flex align-items-center justify-content-center text-white mb-1.5 shadow-2xs"
                  style={{ backgroundColor: '#ED1C24', width: '34px', height: '34px' }}
                >
                  <Ticket size={17} />
                </div>
                <div className="fw-semibold text-dark" style={{ fontSize: '0.75rem', lineHeight: 1.25 }}>
                  Digital <br /> Ticketing
                </div>
              </div>

              <div className="col-6 col-sm-3 text-center">
                <div
                  className="rounded-circle mx-auto p-2 d-flex align-items-center justify-content-center text-white mb-1.5 shadow-2xs"
                  style={{ backgroundColor: '#ED1C24', width: '34px', height: '34px' }}
                >
                  <Bot size={17} />
                </div>
                <div className="fw-semibold text-dark" style={{ fontSize: '0.75rem', lineHeight: 1.25 }}>
                  AI Travel <br /> Assistant
                </div>
              </div>

              <div className="col-6 col-sm-3 text-center">
                <div
                  className="rounded-circle mx-auto p-2 d-flex align-items-center justify-content-center text-white mb-1.5 shadow-2xs"
                  style={{ backgroundColor: '#ED1C24', width: '34px', height: '34px' }}
                >
                  <Activity size={17} />
                </div>
                <div className="fw-semibold text-dark" style={{ fontSize: '0.75rem', lineHeight: 1.25 }}>
                  Live ETA & <br /> Crowd Prediction
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Artwork (Phone + Bus + Backdrop) */}
          <div className="col-lg-6 position-relative text-center">
            {/* Tagline script text overlay */}
            <div
              className="position-absolute end-0 top-0 d-none d-md-block pe-3"
              style={{ zIndex: 5, marginTop: '-24px' }}
            >
              <span
                className="font-script fs-4 fw-bold"
                style={{
                  color: '#374151',
                  transform: 'rotate(-4deg)',
                  display: 'inline-block',
                }}
              >
                Your journey perfectly synced.
              </span>
            </div>

            {/* Visual Card Frame */}
            <div
              className="position-relative mx-auto rounded-4 overflow-hidden shadow-sm"
              style={{
                maxWidth: '540px',
                height: 'clamp(280px, 44vw, 360px)',
                backgroundImage: 'url(/kerala_scenic_backdrop.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid #E5E7EB',
              }}
            >
              {/* Soft overlay */}
              <div
                className="position-absolute inset-0 w-100 h-100"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.3) 100%)',
                }}
              />

              {/* Floating Pill Badge */}
              <div
                className="position-absolute bg-white px-2.5 py-1 rounded-pill shadow-xs border d-flex align-items-center gap-1.5"
                style={{
                  top: 'clamp(10px, 3vw, 14px)',
                  left: 'clamp(10px, 3vw, 14px)',
                  fontSize: '0.75rem',
                  zIndex: 3,
                }}
              >
                <span
                  className="rounded-circle bg-success d-inline-block flex-shrink-0"
                  style={{ width: '7px', height: '7px' }}
                />
                <span className="fw-bold text-dark">Live GPS Network</span>
                <span className="text-muted">|</span>
                <span className="text-tz-red fw-semibold">Kerala</span>
              </div>

              {/* Red Bus & Phone Composite Graphic */}
              <img
                src="/travelzync_hero_composite.png"
                alt="TravelZync Kerala Transit and App Mockup"
                className="position-absolute animate-float-centered"
                style={{
                  bottom: '0',
                  left: '50%',
                  width: '92%',
                  maxHeight: '94%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.3))',
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>

        {/* FULL-WIDTH STATS ROW (Responsive 2x2 on mobile, 1x4 on desktop with clean dividers) */}
        <div
          className="mt-3 p-1 p-sm-2 rounded-4 bg-white border shadow-xs overflow-hidden"
          style={{ borderColor: '#E5E7EB' }}
        >
          <div className="row g-0 align-items-center text-center">
            {/* Stat 1 */}
            <div className="col-6 col-md-3 tz-stat-col">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-0.5">
                <Users size={18} className="text-tz-red flex-shrink-0" />
                <span className="fw-extrabold text-dark fs-5">{displayCount}</span>
              </div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                People on Waitlist
              </div>
            </div>

            {/* Stat 2 */}
            <div className="col-6 col-md-3 tz-stat-col">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-0.5">
                <Bus size={18} className="text-tz-red flex-shrink-0" />
                <span className="fw-extrabold text-dark fs-5">300+</span>
              </div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                Private Buses (Target)
              </div>
            </div>

            {/* Stat 3 */}
            <div className="col-6 col-md-3 tz-stat-col">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-0.5">
                <MapPin size={18} className="text-tz-red flex-shrink-0" />
                <span className="fw-extrabold text-dark fs-5">Kerala</span>
              </div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                Our Starting Point
              </div>
            </div>

            {/* Stat 4 */}
            <div className="col-6 col-md-3 tz-stat-col">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-0.5">
                <Smartphone size={18} className="text-tz-red flex-shrink-0" />
                <span className="fw-extrabold text-dark fs-5">All-in-One</span>
              </div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                Buses, Autos, Cabs & More
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
