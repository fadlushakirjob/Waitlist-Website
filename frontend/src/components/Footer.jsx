import React from 'react';
import {
  Lock,
} from 'lucide-react';
import {
  LinkedInIcon,
  InstagramIcon,
} from './SocialIcons';

export default function Footer({
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin,
  onOpenWaitlist,
}) {
  return (
    <footer
      className="bg-dark text-white pt-4 pt-md-5 position-relative"
      style={{
        backgroundColor: '#0F172A',
        borderTop: '3px solid #ED1C24',
        paddingBottom: 'max(1.75rem, calc(1rem + env(safe-area-inset-bottom)))',
      }}
    >
      <div className="tz-container">
        <div className="row gy-4 mb-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2.5 mb-2.5">
              <img
                src="/travelzync_logo_clean.png"
                alt="TravelZync Official Logo"
                style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '8px' }}
              />
              <div className="d-flex flex-column">
                <span className="fw-bold fs-5 lh-1 text-white">
                  Travel<span style={{ color: '#ED1C24' }}>Zync</span>
                </span>
                <span className="font-script fs-6 text-white-50 mt-0.5">
                  Your journey perfectly synced.
                </span>
              </div>
            </div>

            <p className="text-secondary small mb-3" style={{ color: '#94A3B8', lineHeight: 1.55, fontSize: '0.825rem' }}>
              TravelZync Labs Private Limited is pioneering next-generation public transportation
              intelligence for Kerala. Real-time bus tracking, digital ticketing, and AI travel
              guidance tailored for daily commuters.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-2">
              <a
                href="https://www.instagram.com/travelzynclabs?cplk=dW01d3BybXNuNzlj"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle p-2 text-white d-flex align-items-center justify-content-center"
                style={{ width: '34px', height: '34px' }}
                title="Instagram"
              >
                <InstagramIcon size={14} color="#ffffff" />
              </a>
              <a
                href="https://www.linkedin.com/company/travelzynclabs/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle p-2 text-white d-flex align-items-center justify-content-center"
                style={{ width: '34px', height: '34px' }}
                title="LinkedIn"
              >
                <LinkedInIcon size={14} color="#ffffff" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-white small mb-3 tracking-wider" style={{ fontSize: '0.8rem' }}>
              Navigation
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small" style={{ color: '#94A3B8', fontSize: '0.825rem' }}>
              <li>
                <a href="#home" className="text-decoration-none text-secondary hover-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-decoration-none text-secondary hover-white">
                  About TravelZync
                </a>
              </li>
              <li>
                <a href="#features" className="text-decoration-none text-secondary hover-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-decoration-none text-secondary hover-white">
                  Our Journey
                </a>
              </li>
              <li>
                <a href="#contact" className="text-decoration-none text-secondary hover-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Key Milestones */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-white small mb-3 tracking-wider" style={{ fontSize: '0.8rem' }}>
              Highlights
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary" style={{ fontSize: '0.825rem' }}>
              <li className="d-flex align-items-start">
                <span className="text-danger me-2" style={{ fontSize: '1rem', lineHeight: 1 }}>•</span>
                <span>Best Startup Runner-up, NIT Calicut</span>
              </li>
              <li className="d-flex align-items-start">
                <span className="text-danger me-2" style={{ fontSize: '1rem', lineHeight: 1 }}>•</span>
                <span>Showcased to Kerala Transport Minister</span>
              </li>
              <li className="d-flex align-items-start">
                <span className="text-danger me-2" style={{ fontSize: '1rem', lineHeight: 1 }}>•</span>
                <span>KSRTC & Fleet Integration Talks</span>
              </li>
              <li className="d-flex align-items-start">
                <span className="text-danger me-2" style={{ fontSize: '1rem', lineHeight: 1 }}>•</span>
                <span>Target: 300+ Private Buses</span>
              </li>
            </ul>
          </div>

          {/* Legal & Operations */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold text-white small mb-3 tracking-wider" style={{ fontSize: '0.8rem' }}>
              Headquarters
            </h6>
            <div className="small text-secondary mb-3" style={{ color: '#94A3B8', lineHeight: 1.5, fontSize: '0.825rem' }}>
              <div className="fw-semibold text-white mb-0.5">TravelZync Labs Private Limited</div>
              <div>Calicut & Kochi, Kerala, India</div>
              <div>Email: contact@travelzync.com</div>
            </div>

            <button
              className="btn btn-tz-primary btn-sm px-3.5 py-2 w-100 w-sm-auto justify-content-center"
              onClick={onOpenWaitlist}
              style={{ fontSize: '0.825rem' }}
            >
              Join Official Waitlist
            </button>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div
          className="pt-3 border-top d-flex flex-column flex-md-row align-items-center justify-content-between gap-2.5 text-secondary small text-center text-md-start"
          style={{ borderColor: 'rgba(255,255,255,0.1)', fontSize: '0.8rem' }}
        >
          <div>
            © {new Date().getFullYear()} TravelZync Labs Private Limited. All rights reserved.
          </div>

          <div className="d-flex align-items-center justify-content-center gap-2 gap-sm-3 flex-wrap">
            <button
              className="btn btn-link p-0 text-secondary small text-decoration-none hover-white"
              onClick={onOpenPrivacy}
              style={{ fontSize: '0.8rem' }}
            >
              Privacy Policy
            </button>
            <span className="text-white-50">•</span>
            <button
              className="btn btn-link p-0 text-secondary small text-decoration-none hover-white"
              onClick={onOpenTerms}
              style={{ fontSize: '0.8rem' }}
            >
              Terms and Conditions
            </button>
            <span className="text-white-50">•</span>
            <button
              className="btn btn-link p-0 text-secondary small text-decoration-none hover-white d-flex align-items-center gap-1"
              onClick={onOpenAdmin}
              title="Administrator Login Portal"
              style={{ fontSize: '0.8rem' }}
            >
              <Lock size={12} />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
