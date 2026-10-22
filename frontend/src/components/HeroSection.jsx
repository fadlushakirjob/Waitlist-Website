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
  CheckCircle2,
  Sparkles,
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
      className="position-relative overflow-hidden pt-5"
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
      }}
    >
      {/* Subtle Background Glow Circles */}
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '-150px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(237,28,36,0.08) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
        }}
      />
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          bottom: '50px',
          left: '-100px',
          background: 'radial-gradient(circle, rgba(237,28,36,0.05) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center gy-5">
          {/* LEFT COLUMN: Hero Copy & Waitlist Form */}
          <div className="col-lg-6 pe-lg-4">
            {/* Early Access Pill */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-tz-red-light border border-danger-subtle">
              <span className="badge rounded-pill bg-tz-red text-white py-1 px-2" style={{ fontSize: '0.75rem' }}>
                EARLY ACCESS
              </span>
              <span className="text-tz-red fw-semibold" style={{ fontSize: '0.85rem' }}>
                Kerala's Next-Gen Public Transit Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="display-4 fw-extrabold mb-3 tracking-tight"
              style={{
                color: '#111827',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-1px',
              }}
            >
              A Smarter Way to <br />
              <span style={{ color: '#ED1C24' }}>Travel in Kerala</span>
            </h1>

            {/* Description Subtitle */}
            <p
              className="lead text-secondary mb-4"
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: '#4B5563',
                maxWidth: '540px',
              }}
            >
              Real-time bus tracking, digital ticketing, AI travel assistant and more —
              all in one platform. Join the waitlist and be the first to experience TravelZync.
            </p>

            {/* Hero Waitlist Inline Form */}
            <form
              onSubmit={handleSubmit}
              className="mb-2"
              style={{ maxWidth: '520px' }}
            >
              <div
                className="d-flex flex-column flex-sm-row gap-2 p-1 rounded-pill bg-white shadow-sm border"
                style={{
                  borderColor: '#E5E7EB',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)',
                }}
              >
                <div className="d-flex align-items-center flex-grow-1 ps-3 py-2">
                  <Mail size={18} className="text-muted me-2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="form-control border-0 shadow-none p-0 text-dark"
                    style={{ fontSize: '0.95rem' }}
                    id="hero-email-input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-tz-primary px-4 py-2"
                  id="hero-join-waitlist-btn"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            <p className="text-muted small ps-2 mb-4" style={{ fontSize: '0.825rem' }}>
              <Sparkles size={13} className="text-warning me-1 inline-block" />
              Get early access, product updates and exclusive launch perks. Zero spam.
            </p>

            {/* 4 Quick Feature Pills Below Input (from mockup) */}
            <div className="row g-2 pt-2 mb-4" style={{ maxWidth: '540px' }}>
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-white border shadow-2xs">
                  <div
                    className="rounded-circle p-1 d-flex align-items-center justify-content-center text-white"
                    style={{ backgroundColor: '#ED1C24', width: '26px', height: '26px' }}
                  >
                    <Bus size={14} />
                  </div>
                  <span className="fw-semibold text-dark" style={{ fontSize: '0.78rem', lineHeight: 1.2 }}>
                    Real-time Bus Tracking
                  </span>
                </div>
              </div>
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-white border shadow-2xs">
                  <div
                    className="rounded-circle p-1 d-flex align-items-center justify-content-center text-white"
                    style={{ backgroundColor: '#ED1C24', width: '26px', height: '26px' }}
                  >
                    <Ticket size={14} />
                  </div>
                  <span className="fw-semibold text-dark" style={{ fontSize: '0.78rem', lineHeight: 1.2 }}>
                    Digital Ticketing
                  </span>
                </div>
              </div>
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-white border shadow-2xs">
                  <div
                    className="rounded-circle p-1 d-flex align-items-center justify-content-center text-white"
                    style={{ backgroundColor: '#ED1C24', width: '26px', height: '26px' }}
                  >
                    <Bot size={14} />
                  </div>
                  <span className="fw-semibold text-dark" style={{ fontSize: '0.78rem', lineHeight: 1.2 }}>
                    AI Travel Assistant
                  </span>
                </div>
              </div>
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-white border shadow-2xs">
                  <div
                    className="rounded-circle p-1 d-flex align-items-center justify-content-center text-white"
                    style={{ backgroundColor: '#ED1C24', width: '26px', height: '26px' }}
                  >
                    <Activity size={14} />
                  </div>
                  <span className="fw-semibold text-dark" style={{ fontSize: '0.78rem', lineHeight: 1.2 }}>
                    Live ETA & Crowd
                  </span>
                </div>
              </div>
            </div>

            {/* Stat Counters / Highlights Bar (from mockup) */}
            <div
              className="row g-2 p-3 rounded-4 bg-white border"
              style={{
                borderColor: '#E5E7EB',
                boxShadow: '0 4px 15px -2px rgba(0, 0, 0, 0.04)',
                maxWidth: '540px',
              }}
            >
              <div className="col-6 col-sm-3 text-center border-end-sm">
                <div className="d-flex align-items-center justify-content-center gap-1 text-danger mb-1">
                  <Users size={16} />
                  <span className="fw-bold text-dark fs-6">{displayCount}</span>
                </div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  People on Waitlist
                </div>
              </div>

              <div className="col-6 col-sm-3 text-center border-end-sm">
                <div className="d-flex align-items-center justify-content-center gap-1 text-danger mb-1">
                  <Bus size={16} />
                  <span className="fw-bold text-dark fs-6">300+</span>
                </div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  Private Buses (Target)
                </div>
              </div>

              <div className="col-6 col-sm-3 text-center border-end-sm">
                <div className="d-flex align-items-center justify-content-center gap-1 text-danger mb-1">
                  <MapPin size={16} />
                  <span className="fw-bold text-dark fs-6">Kerala</span>
                </div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  Our Starting Point
                </div>
              </div>

              <div className="col-6 col-sm-3 text-center">
                <div className="d-flex align-items-center justify-content-center gap-1 text-danger mb-1">
                  <Smartphone size={16} />
                  <span className="fw-bold text-dark fs-6">All-in-One</span>
                </div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  Buses, Autos, Cabs
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Authentic Mockup Composite Graphic with Kerala Backdrop */}
          <div className="col-lg-6 position-relative text-center">
            {/* Tagline in script cursive overlay from mockup */}
            <div
              className="position-absolute end-0 top-0 d-none d-md-block pe-4"
              style={{ zIndex: 10, marginTop: '-20px' }}
            >
              <span
                className="font-script fs-3 fw-bold"
                style={{
                  color: '#ED1C24',
                  transform: 'rotate(-4deg)',
                  display: 'inline-block',
                  textShadow: '0 2px 4px rgba(255,255,255,0.8)',
                }}
              >
                Your journey perfectly synced.
              </span>
            </div>

            {/* Visual Container Card */}
            <div
              className="position-relative mx-auto rounded-5 overflow-hidden shadow-lg p-2"
              style={{
                maxWidth: '560px',
                background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%)',
                border: '1.5px solid rgba(237, 28, 36, 0.15)',
              }}
            >
              {/* Kerala Scenic Backdrop Image */}
              <div
                className="position-relative w-100 rounded-4 overflow-hidden"
                style={{
                  height: '420px',
                  backgroundImage: 'url(/kerala_scenic_backdrop.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Soft Gradient Overlay for depth */}
                <div
                  className="position-absolute inset-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
                  }}
                />

                {/* Hero Composite (Authentic Kerala Red Bus + Smartphone App Mockup) */}
                <img
                  src="/travelzync_hero_composite.png"
                  alt="TravelZync Kerala Bus and Smartphone App Mockup"
                  className="position-absolute animate-float"
                  style={{
                    bottom: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '92%',
                    maxHeight: '430px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))',
                  }}
                />

                {/* Floating Interactive Status Badge */}
                <div
                  className="position-absolute top-3 start-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-pill shadow-sm border d-flex align-items-center gap-2"
                  style={{ top: '16px', left: '16px', fontSize: '0.8rem' }}
                >
                  <span
                    className="rounded-circle bg-success d-inline-block animate-pulse-subtle"
                    style={{ width: '8px', height: '8px' }}
                  />
                  <span className="fw-semibold text-dark">Live GPS Active</span>
                  <span className="text-muted">|</span>
                  <span className="text-tz-red fw-bold">KL-11 Kozhikode</span>
                </div>

                {/* Floating Arrival Card */}
                <div
                  className="position-absolute bottom-3 end-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-4 shadow-md border text-start"
                  style={{ bottom: '16px', right: '16px', fontSize: '0.78rem', maxWidth: '210px' }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="badge bg-danger text-white py-1 px-2 rounded-pill" style={{ fontSize: '0.65rem' }}>
                      ON TIME
                    </span>
                    <span className="text-muted fw-bold">2.4 km away</span>
                  </div>
                  <div className="fw-bold text-dark text-truncate">Calicut ➔ Malappuram Express</div>
                  <div className="text-success small fw-semibold">Arriving in 4 mins • 12 seats left</div>
                </div>
              </div>
            </div>

            {/* Bottom Caption for Mobile */}
            <div className="d-md-none mt-2">
              <span className="font-script fs-4 fw-bold text-tz-red">
                Your journey perfectly synced.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
