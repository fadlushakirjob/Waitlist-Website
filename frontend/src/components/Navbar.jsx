import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenWaitlist, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

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
          ? 'tz-navbar-scrolled py-2'
          : 'tz-navbar-top py-2.5 py-md-3'
      }`}
      style={{
        zIndex: 1030,
        paddingTop: 'max(0.6rem, env(safe-area-inset-top))',
      }}
    >
      <div className="tz-container d-flex align-items-center justify-content-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          className="navbar-brand d-flex align-items-center gap-2 gap-sm-2.5 text-decoration-none m-0 p-0"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
        >
          <img
            src="/travelzync_logo_clean.png"
            alt="TravelZync Official Logo"
            style={{
              width: '38px',
              height: '38px',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
          <div className="d-flex flex-column">
            <span
              className="fw-extrabold lh-1 tz-brand-text"
              style={{
                letterSpacing: '-0.5px',
                fontWeight: 800,
                fontSize: 'clamp(1.2rem, 3.5vw, 1.45rem)',
              }}
            >
              Travel<span style={{ color: '#ED1C24', fontWeight: 800 }}>Zync</span>
            </span>
            <span
              className="font-script fs-6 lh-1 mt-0.5 d-none d-sm-inline tz-brand-tagline"
              style={{ fontWeight: 600 }}
            >
              Your journey perfectly synced.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links & Controls */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <ul className="navbar-nav d-flex flex-row align-items-center gap-4 mb-0">
            <li className="nav-item">
              <a
                className="nav-link p-0 fw-semibold tz-nav-link"
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
                className="nav-link p-0 fw-semibold tz-nav-link"
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
                className="nav-link p-0 fw-semibold tz-nav-link"
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
                className="nav-link p-0 fw-semibold tz-nav-link"
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
                className="nav-link p-0 fw-semibold tz-nav-link"
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

          <div className="d-flex align-items-center gap-2.5">
            {/* Theme Toggle Button (Desktop) */}
            <button
              type="button"
              className="btn tz-theme-toggle-btn d-flex align-items-center justify-content-center p-2 rounded-circle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{ width: '38px', height: '38px' }}
            >
              {isDark ? (
                <Sun size={18} className="text-warning" />
              ) : (
                <Moon size={18} className="text-secondary" />
              )}
            </button>

            {/* Waitlist CTA */}
            <button
              className="btn btn-tz-primary"
              onClick={onOpenWaitlist}
              id="nav-join-waitlist-btn"
              style={{ padding: '0.55rem 1.35rem', fontSize: '0.9rem' }}
            >
              <span>Join Waitlist</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Header Right Controls: Theme Toggle & Hamburger */}
        <div className="d-flex align-items-center gap-1.5 d-lg-none">
          {/* Theme Toggle Button (Mobile Quick Access) */}
          <button
            type="button"
            className="btn tz-theme-toggle-btn d-flex align-items-center justify-content-center p-2 rounded-3"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ width: '40px', height: '40px' }}
          >
            {isDark ? (
              <Sun size={19} className="text-warning" />
            ) : (
              <Moon size={19} className="text-secondary" />
            )}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="navbar-toggler border-0 shadow-none d-inline-flex align-items-center justify-content-center p-2 rounded-3 tz-mobile-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{ width: '42px', height: '42px' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className="d-lg-none w-100 tz-mobile-dropdown border-top shadow-lg"
          style={{
            maxHeight: 'calc(100vh - 75px)',
            overflowY: 'auto',
            padding: '1rem 1.25rem 1.5rem',
          }}
        >
          <ul className="navbar-nav gap-2 mb-3">
            <li className="nav-item">
              <button
                className="btn text-start py-2.5 px-3 fw-semibold w-100 rounded-3 tz-mobile-link-btn"
                onClick={() => scrollTo('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start py-2.5 px-3 fw-semibold w-100 rounded-3 tz-mobile-link-btn"
                onClick={() => scrollTo('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start py-2.5 px-3 fw-semibold w-100 rounded-3 tz-mobile-link-btn"
                onClick={() => scrollTo('features')}
              >
                Features
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start py-2.5 px-3 fw-semibold w-100 rounded-3 tz-mobile-link-btn"
                onClick={() => scrollTo('achievements')}
              >
                Our Journey
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-start py-2.5 px-3 fw-semibold w-100 rounded-3 tz-mobile-link-btn"
                onClick={() => scrollTo('contact')}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Theme Switch Row in Mobile Dropdown */}
          <div className="pt-2.5 border-top d-flex align-items-center justify-content-between mb-3 tz-border-subtle">
            <span className="small fw-semibold text-secondary">Display Theme</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-pill d-flex align-items-center gap-2 px-3 py-1.5"
              onClick={toggleTheme}
            >
              {isDark ? (
                <>
                  <Sun size={15} className="text-warning" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={15} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <button
            className="btn btn-tz-primary w-100 py-2.5 justify-content-center"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWaitlist();
            }}
          >
            <span>Join Official Waitlist</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </nav>
  );
}
