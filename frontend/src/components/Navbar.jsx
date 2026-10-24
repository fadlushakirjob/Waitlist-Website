import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Lock } from 'lucide-react';

export default function Navbar({ onOpenWaitlist, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-sm py-2'
          : 'bg-white py-3'
      }`}
      style={{
        zIndex: 1030,
        borderBottom: '1px solid #f1f5f9',
      }}
    >
      <div className="tz-container d-flex align-items-center justify-content-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          className="navbar-brand d-flex align-items-center gap-2.5 text-decoration-none m-0 p-0"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
        >
          <img
            src="/travelzync_logo_clean.png"
            alt="TravelZync Official Logo"
            style={{
              width: '42px',
              height: '42px',
              objectFit: 'contain',
              borderRadius: '9px',
            }}
          />
          <div className="d-flex flex-column">
            <span
              className="fw-extrabold fs-4 lh-1"
              style={{ color: '#111827', letterSpacing: '-0.5px' }}
            >
              Travel<span style={{ color: '#ED1C24' }}>Zync</span>
            </span>
            <span
              className="font-script fs-6 lh-1 mt-0.5"
              style={{ color: '#6B7280', fontWeight: 600 }}
            >
              Your journey perfectly synced.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <ul className="navbar-nav d-flex flex-row align-items-center gap-4 mb-0">
            <li className="nav-item">
              <a
                className="nav-link p-0 fw-semibold text-dark hover-red"
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('home');
                }}
                style={{ fontSize: '0.925rem' }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link p-0 fw-semibold text-dark hover-red"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('about');
                }}
                style={{ fontSize: '0.925rem' }}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link p-0 fw-semibold text-dark hover-red"
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('features');
                }}
                style={{ fontSize: '0.925rem' }}
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link p-0 fw-semibold text-dark hover-red"
                href="#achievements"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('achievements');
                }}
                style={{ fontSize: '0.925rem' }}
              >
                Our Journey
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link p-0 fw-semibold text-dark hover-red"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                style={{ fontSize: '0.925rem' }}
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-tz-primary"
              onClick={onOpenWaitlist}
              id="nav-join-waitlist-btn"
              style={{ padding: '0.55rem 1.35rem', fontSize: '0.9rem' }}
            >
              <span>Join Waitlist</span>
              <ArrowRight size={15} />
            </button>

            {onOpenAdmin && (
              <button
                type="button"
                className="btn btn-outline-secondary d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill shadow-2xs"
                onClick={onOpenAdmin}
                id="nav-admin-login-btn"
                title="Administrator Login Portal"
                style={{ fontSize: '0.825rem' }}
              >
                <Lock size={13} />
                <span className="fw-semibold">Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="navbar-toggler border-0 shadow-none d-lg-none p-1"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} color="#111827" /> : <Menu size={24} color="#111827" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="d-lg-none w-100 bg-white border-top py-3 px-4 shadow-lg">
          <ul className="navbar-nav gap-3 mb-3">
            <li className="nav-item">
              <button
                className="btn text-start p-0 fw-semibold text-dark w-100"
                onClick={() => scrollTo('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start p-0 fw-semibold text-dark w-100"
                onClick={() => scrollTo('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start p-0 fw-semibold text-dark w-100"
                onClick={() => scrollTo('features')}
              >
                Features
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start p-0 fw-semibold text-dark w-100"
                onClick={() => scrollTo('achievements')}
              >
                Our Journey
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start p-0 fw-semibold text-dark w-100"
                onClick={() => scrollTo('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
          <button
            className="btn btn-tz-primary w-100 py-2 justify-content-center mb-2"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWaitlist();
            }}
          >
            <span>Join Waitlist</span>
            <ArrowRight size={15} />
          </button>

          {onOpenAdmin && (
            <button
              type="button"
              className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
            >
              <Lock size={15} />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
