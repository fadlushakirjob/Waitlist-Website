import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Mail,
  User,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { joinWaitlist, getKeralaDistricts } from '../services/api';

export default function WaitlistModal({
  isOpen,
  onClose,
  initialEmail = '',
  onRegistrationSuccess,
  onOpenPrivacy,
}) {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone_number: '',
    district: '',
    consent_updates: true,
    website_hp: '',
  });

  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successResult, setSuccessResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setFormData((prev) => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

  useEffect(() => {
    getKeralaDistricts().then((data) => setDistricts(data));
  }, []);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ED1C24', '#111827', '#F59E0B', '#10B981'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!formData.consent_updates) {
      setErrorMsg('Please agree to receive product updates to join the waitlist.');
      return;
    }

    setIsLoading(true);

    const res = await joinWaitlist(formData);
    setIsLoading(false);

    if (res.ok && res.data.success) {
      setSuccessResult(res.data);
      triggerConfetti();
      if (onRegistrationSuccess) {
        onRegistrationSuccess(res.data);
      }
    } else {
      setErrorMsg(
        res.data?.message ||
        'Failed to join waitlist. Please check your details and try again.'
      );
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(
      'Join me on the TravelZync waitlist! Transforming Kerala public transit: https://travelzync.com'
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hey! I just reserved my spot on the TravelZync waitlist for smarter bus travel in Kerala. Join early here: https://travelzync.com`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(17, 24, 39, 0.75)', zIndex: 1070 }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={{ maxWidth: '500px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden position-relative">
          {/* Close Button */}
          <button
            type="button"
            className="btn btn-light rounded-circle position-absolute top-3 end-3 p-1.5 d-flex align-items-center justify-content-center shadow-sm"
            style={{ top: '12px', right: '12px', width: '36px', height: '36px', zIndex: 10 }}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          {!successResult ? (
            /* WAITLIST SIGNUP FORM */
            <div className="p-3 p-sm-4 p-md-5">
              {/* Header with Official Logo */}
              <div className="text-center mb-3 mb-sm-4">
                <div
                  className="rounded-3 mx-auto p-1 d-flex align-items-center justify-content-center mb-2 shadow-sm"
                  style={{
                    backgroundColor: '#fff',
                    width: '58px',
                    height: '58px',
                  }}
                >
                  <img
                    src="/travelzync_logo_clean.png"
                    alt="TravelZync Official Logo"
                    style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '10px' }}
                  />
                </div>
                <h3 className="fw-extrabold text-dark mb-1" style={{ fontSize: '1.35rem' }}>
                  Join the TravelZync Waitlist
                </h3>
                <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>
                  Be the first to experience live bus tracking, digital ticketing, and AI travel in Kerala.
                </p>
              </div>

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-start gap-2 py-2 px-3 rounded-3 small mb-3">
                  <AlertCircle size={16} className="text-danger flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '0.85rem' }}>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Email (Required) */}
                <div className="mb-2.5">
                  <label className="form-label small fw-semibold text-dark mb-1">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted px-2.5">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="form-control border-start-0 ps-1"
                      id="modal-email-input"
                    />
                  </div>
                </div>

                {/* Full Name (Optional) */}
                <div className="mb-2.5">
                  <label className="form-label small fw-semibold text-dark mb-1">
                    Full Name <span className="text-muted fw-normal">(Optional)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted px-2.5">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Rahul Menon"
                      className="form-control border-start-0 ps-1"
                      id="modal-name-input"
                    />
                  </div>
                </div>

                {/* Mobile Number (Optional) */}
                <div className="mb-2.5">
                  <label className="form-label small fw-semibold text-dark mb-1">
                    Mobile Number <span className="text-muted fw-normal">(Optional for SMS alerts)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted px-2.5">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      placeholder="+91 98470 00000"
                      className="form-control border-start-0 ps-1"
                      id="modal-phone-input"
                    />
                  </div>
                </div>

                {/* Preferred District in Kerala (Optional) */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-dark mb-1">
                    Preferred District in Kerala <span className="text-muted fw-normal">(Optional)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted px-2.5">
                      <MapPin size={16} />
                    </span>
                    <select
                      className="form-select border-start-0 ps-1 text-dark"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      id="modal-district-select"
                    >
                      <option value="">Select your preferred district</option>
                      {districts.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="form-check mb-3.5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="consentCheck"
                    checked={formData.consent_updates}
                    onChange={(e) =>
                      setFormData({ ...formData, consent_updates: e.target.checked })
                    }
                  />
                  <label
                    className="form-check-label text-muted small"
                    htmlFor="consentCheck"
                    style={{ fontSize: '0.8rem', lineHeight: 1.4 }}
                  >
                    I agree to receive product launch updates, beta access invites, and service alerts
                    from TravelZync Labs. Read our{' '}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-tz-red small text-decoration-underline"
                      onClick={onOpenPrivacy}
                    >
                      Privacy Policy
                    </button>
                    .
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-tz-primary w-100 py-2.5 justify-content-center fw-bold"
                  id="modal-submit-waitlist-btn"
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : (
                    <>
                      <span>Reserve My Spot</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="p-3 p-sm-4 p-md-5 text-center">
              <div
                className="rounded-circle mx-auto p-3 d-flex align-items-center justify-content-center mb-2.5 shadow-md"
                style={{ backgroundColor: '#DCFCE7', width: '64px', height: '64px' }}
              >
                <CheckCircle size={34} className="text-success" />
              </div>

              <div className="badge bg-danger rounded-pill px-3 py-1 mb-2">
                SPOT CONFIRMED
              </div>

              <h3 className="fw-extrabold text-dark mb-1 fs-4">
                You’re on the Waitlist!
              </h3>
              <p className="text-muted small mb-3">
                We have registered your details in the official TravelZync queue.
              </p>

              {/* Queue Position Box */}
              <div
                className="p-3 p-sm-4 rounded-4 bg-light border mb-3 position-relative overflow-hidden"
                style={{ borderColor: 'var(--tz-border)' }}
              >
                <span className="text-muted small text-uppercase tracking-wider fw-semibold" style={{ fontSize: '0.72rem' }}>
                  Assigned Queue Position
                </span>
                <div
                  className="display-6 fw-extrabold text-tz-red my-1"
                  style={{ letterSpacing: '-1px' }}
                >
                  #{successResult.queue_number || '10,428'}
                </div>
                <div className="small text-muted" style={{ fontSize: '0.8rem' }}>
                  Registered: {formData.email}
                  {formData.district ? ` • ${formData.district}` : ''}
                </div>
              </div>

              {/* Viral Share Buttons */}
              <div className="d-flex flex-column gap-2 mb-3">
                <button
                  className="btn btn-success d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-pill fw-semibold"
                  onClick={handleWhatsAppShare}
                >
                  <Share2 size={16} />
                  <span>Share with Friends on WhatsApp</span>
                </button>

                <button
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 py-2 rounded-pill small fw-semibold"
                  onClick={handleCopyShare}
                >
                  {copiedLink ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Referral Link'}</span>
                </button>
              </div>

              <button
                className="btn btn-dark rounded-pill px-4 py-2 small"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
