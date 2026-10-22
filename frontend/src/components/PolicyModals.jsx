import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export default function PolicyModals({
  showPrivacy,
  showTerms,
  onClosePrivacy,
  onCloseTerms,
}) {
  return (
    <>
      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(17, 24, 39, 0.75)', zIndex: 1090 }}
          onClick={onClosePrivacy}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
              <div className="modal-header bg-light border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <ShieldCheck size={20} className="text-tz-red" />
                  <h5 className="modal-title fw-bold fs-6 mb-0 text-dark">
                    TravelZync Privacy Policy
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm rounded-circle p-1"
                  onClick={onClosePrivacy}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className="modal-body p-4 text-secondary"
                style={{ maxHeight: '65vh', overflowY: 'auto', fontSize: '0.9rem', lineHeight: 1.6 }}
              >
                <p className="text-muted small">
                  <strong>Effective Date:</strong> October 2026 | TravelZync Labs Private Limited
                </p>

                <h6 className="fw-bold text-dark mt-3">1. Information We Collect</h6>
                <p>
                  When you join our waitlist, TravelZync Labs Private Limited collects your email
                  address (required), full name (optional), mobile phone number (optional), and your
                  preferred Kerala district (optional). We also log your IP address and user-agent
                  solely for anti-abuse and spam protection.
                </p>

                <h6 className="fw-bold text-dark mt-3">2. How We Use Your Information</h6>
                <p>
                  Your information is used strictly to:
                </p>
                <ul>
                  <li>Assign and manage your position in the early-access waitlist queue.</li>
                  <li>Notify you when TravelZync beta releases roll out in your district.</li>
                  <li>Provide critical service announcements, pilot bus routes, and updates.</li>
                  <li>Prevent fraud, bot registrations, and duplicate submissions.</li>
                </ul>

                <h6 className="fw-bold text-dark mt-3">3. Data Protection and Confidentiality</h6>
                <p>
                  We implement industry-standard encryption protocols (TLS/HTTPS) and database
                  security controls. We do not sell, rent, or trade your personal information to third
                  parties or external advertisers.
                </p>

                <h6 className="fw-bold text-dark mt-3">4. Unsubscribe & Data Deletion</h6>
                <p>
                  You may request the complete deletion of your waitlist record or unsubscribe from
                  email communications at any time by sending a request to{' '}
                  <a href="mailto:privacy@travelzync.com" className="text-tz-red">
                    privacy@travelzync.com
                  </a>
                  .
                </p>

                <h6 className="fw-bold text-dark mt-3">5. Contact Information</h6>
                <p>
                  TravelZync Labs Private Limited <br />
                  Email: contact@travelzync.com <br />
                  Kerala, India
                </p>
              </div>

              <div className="modal-footer bg-light px-4 py-2.5">
                <button
                  type="button"
                  className="btn btn-dark rounded-pill px-4 btn-sm"
                  onClick={onClosePrivacy}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TERMS AND CONDITIONS MODAL */}
      {showTerms && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(17, 24, 39, 0.75)', zIndex: 1090 }}
          onClick={onCloseTerms}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
              <div className="modal-header bg-light border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <FileText size={20} className="text-tz-red" />
                  <h5 className="modal-title fw-bold fs-6 mb-0 text-dark">
                    TravelZync Terms and Conditions
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm rounded-circle p-1"
                  onClick={onCloseTerms}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className="modal-body p-4 text-secondary"
                style={{ maxHeight: '65vh', overflowY: 'auto', fontSize: '0.9rem', lineHeight: 1.6 }}
              >
                <p className="text-muted small">
                  <strong>Effective Date:</strong> October 2026 | TravelZync Labs Private Limited
                </p>

                <h6 className="fw-bold text-dark mt-3">1. Waitlist Participation</h6>
                <p>
                  Joining the TravelZync waitlist reserves an early invitation spot for future
                  software pilots. Registration does not guarantee immediate access to mobile apps or
                  ticketing services prior to official launch.
                </p>

                <h6 className="fw-bold text-dark mt-3">2. Accurate Representation</h6>
                <p>
                  TravelZync Labs Private Limited commits to transparent, authentic communication. All
                  milestones, awards (including NIT Calicut Best Startup Runner-Up), and institutional
                  interactions presented on this website are genuine and verified.
                </p>

                <h6 className="fw-bold text-dark mt-3">3. Intellectual Property</h6>
                <p>
                  All trademarks, logos, brand assets, mockups, and software designs on this website
                  belong exclusively to TravelZync Labs Private Limited.
                </p>

                <h6 className="fw-bold text-dark mt-3">4. Governing Law</h6>
                <p>
                  These terms are governed by the laws of India and subject to the jurisdiction of the
                  courts in the state of Kerala.
                </p>
              </div>

              <div className="modal-footer bg-light px-4 py-2.5">
                <button
                  type="button"
                  className="btn btn-dark rounded-pill px-4 btn-sm"
                  onClick={onCloseTerms}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
