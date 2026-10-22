import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenWaitlist, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      className={`navbar navbar-expand-lg fixed-top transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm py-2'
          : 'bg-white/90 backdrop-blur-md py-3'
      }`}
      style={{
        zIndex: 1030,
        borderBottom: '1px solid rgba(229, 231, 235, 0.7)',
      }}
    >
      <div className="container">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
        >
          <img
            src="/travelzync_logo_clean.png"
            alt="TravelZync"
            style={{ width: '42px', height: '42px', objectFit: 'contain' }}
          />
          <div className="d-flex flex-column">
            <span
              className="fw-bold fs-4 lh-1 tracking-tight"
              style={{ color: '#111827', letterSpacing: '-0.5px' }}
            >
              Travel<span style={{ color: '#ED1C24' }}>Zync</span>
            </span>
            <span
              className="font-script fs-6 lh-1 mt-1"
              style={{ color: '#6B7280', fontWeight: 600 }}
            >
              Your journey perfectly synced.
            </span>
          </div>
        </a>

        {/* Mobile Hamburger Button */}
        <button
          className="navbar-toggler border-0 shadow-none d-lg-none"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={26} color="#111827" /> : <Menu size={26} color="#111827" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-center">
          <ul className="navbar-nav gap-4 mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <a
                className="nav-link fw-semibold text-dark hover-red"
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('home');
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold text-dark hover-red"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('about');
                }}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold text-dark hover-red"
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('features');
                }}
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold text-dark hover-red"
                href="#achievements"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('achievements');
                }}
              >
                Our Journey
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold text-dark hover-red"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right CTA Button */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <button
            className="btn btn-tz-primary"
            onClick={onOpenWaitlist}
            id="nav-join-waitlist-btn"
          >
            <span>Join Waitlist</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="d-lg-none w-100 py-3 border-top mt-2 animate__animated animate__fadeIn">
            <ul className="navbar-nav gap-2 mb-3">
              <li className="nav-item">
                <button
                  className="nav-link btn text-start w-100 fw-semibold text-dark py-2"
                  onClick={() => scrollTo('home')}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn text-start w-100 fw-semibold text-dark py-2"
                  onClick={() => scrollTo('about')}
                >
                  About
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn text-start w-100 fw-semibold text-dark py-2"
                  onClick={() => scrollTo('features')}
                >
                  Features
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn text-start w-100 fw-semibold text-dark py-2"
                  onClick={() => scrollTo('achievements')}
                >
                  Our Journey (Achievements)
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn text-start w-100 fw-semibold text-dark py-2"
                  onClick={() => scrollTo('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
            <button
              className="btn btn-tz-primary w-100 py-2 justify-content-center"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
            >
              <span>Join Waitlist</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
