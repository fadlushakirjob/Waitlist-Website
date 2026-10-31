import React, { useState, useEffect, useRef } from 'react';
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
  Download,
  Sparkles,
} from 'lucide-react';
import { joinWaitlist, getKeralaDistricts } from '../services/api';
import passTemplateImg from '../assets/travelzync_waitlist_pass_template.png';

/**
 * Format the user's name accurately in Title Case for the personalized pass,
 * properly handling initials, hyphens, and apostrophes (e.g. Razal Rahman, O'Connor, Al-Sayed).
 */
function formatDisplayName(name, email) {
  let raw = (name && name.trim()) || '';
  if (!raw && email && email.includes('@')) {
    raw = email.split('@')[0].replace(/[._-]/g, ' ');
  }
  if (!raw) return 'TravelZync VIP';

  return raw
    .toLowerCase()
    .replace(/(?:^|[\s\-\'])[a-z]/g, (char) => char.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

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
  const [showPassCard, setShowPassCard] = useState(false);
  const [passCountdown, setPassCountdown] = useState(20);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  const autoShowTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Both bundled hashed asset and public root fallback
  const passImageSource = passTemplateImg || '/travelzync_waitlist_pass_template.png';

  useEffect(() => {
    if (initialEmail) {
      setFormData((prev) => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

  useEffect(() => {
    getKeralaDistricts().then((data) => setDistricts(data));
  }, []);

  // 20-second auto-close timer when the pass card is displayed (pauses on touch/hold for phone users)
  useEffect(() => {
    if (!showPassCard) {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      return;
    }

    setPassCountdown(20);
    setIsTimerPaused(false);

    countdownIntervalRef.current = setInterval(() => {
      setPassCountdown((prev) => {
        // Do not decrement if user is holding/touching the card on their phone
        if (isTimerPaused) return prev;

        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          setShowPassCard(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [showPassCard, isTimerPaused]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (autoShowTimerRef.current) clearTimeout(autoShowTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      // Subtle phone vibration feedback if supported
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([30, 40, 30]);
      }
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

    // Dismiss phone virtual keyboard
    if (typeof document !== 'undefined' && document.activeElement) {
      document.activeElement.blur();
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
      // After showing the spot confirmation screen, automatically present the personalized card
      if (autoShowTimerRef.current) clearTimeout(autoShowTimerRef.current);
      autoShowTimerRef.current = setTimeout(() => {
        setShowPassCard(true);
      }, 1500);
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

  const handleClosePassCard = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setShowPassCard(false);
  };

  const handleFullClose = () => {
    if (autoShowTimerRef.current) clearTimeout(autoShowTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setShowPassCard(false);
    onClose();
  };

  const displayName = formatDisplayName(formData.full_name, formData.email);
  const nameLength = displayName.length;

  // Accurate typography scale based on character count so names never wrap or overflow
  const nameScale = nameLength > 24 ? 0.74 : nameLength > 16 ? 0.88 : 1.0;

  // Phone-friendly Share or Download handler using Web Share API with Canvas fallback
  const handleShareOrDownloadPass = async () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 576;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = passImageSource;

      img.onload = async () => {
        ctx.drawImage(img, 0, 0, 576, 1024);

        // Accurate font proportions matching original image
        let ptSize = 27;
        if (nameLength > 24) ptSize = 19;
        else if (nameLength > 16) ptSize = 23;

        ctx.font = `800 ${ptSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(displayName, 288, 356);

        // Native Mobile Share sheet if supported on phone (iOS Safari & Android Chrome)
        if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
          try {
            canvas.toBlob(async (blob) => {
              if (blob) {
                const file = new File(
                  [blob],
                  `TravelZync_Pass_${displayName.replace(/[^a-zA-Z0-9]/g, '_')}.png`,
                  { type: 'image/png' }
                );
                if (navigator.canShare({ files: [file] })) {
                  await navigator.share({
                    files: [file],
                    title: 'TravelZync VIP Pass',
                    text: 'I just reserved my early spot on the TravelZync waitlist! Transforming Kerala public transit.',
                  });
                  return;
                }
              }
              downloadFromCanvas(canvas);
            }, 'image/png');
            return;
          } catch (shareErr) {
            if (shareErr && shareErr.name !== 'AbortError') {
              downloadFromCanvas(canvas);
            }
            return;
          }
        }

        downloadFromCanvas(canvas);
      };

      img.onerror = () => {
        downloadFromCanvas(canvas);
      };
    } catch (err) {
      console.error('Share or download error:', err);
    }
  };

  const downloadFromCanvas = (canvas) => {
    const a = document.createElement('a');
    a.download = `TravelZync_Pass_${displayName.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(17, 24, 39, 0.82)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1070,
        padding: '0.5rem',
      }}
      onClick={handleFullClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: showPassCard ? '380px' : '500px',
          width: '100%',
          margin: '0.5rem auto',
          transition: 'max-width 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden position-relative"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Main Close Button (for form or standard confirmation) */}
          {!showPassCard && (
            <button
              type="button"
              className="btn btn-light rounded-circle position-absolute top-3 end-3 p-1.5 d-flex align-items-center justify-content-center shadow-sm"
              style={{
                top: '12px',
                right: '12px',
                width: '38px',
                height: '38px',
                zIndex: 10,
                touchAction: 'manipulation',
              }}
              onClick={handleFullClose}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          )}

          {!successResult ? (
            /* ========================================================== */
            /* 1. WAITLIST SIGNUP FORM                                   */
            /* ========================================================== */
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
                      inputMode="email"
                      autoCapitalize="none"
                    />
                  </div>
                </div>

                {/* Full Name (For Personalized Pass) */}
                <div className="mb-2.5">
                  <label className="form-label small fw-semibold text-dark mb-1">
                    Full Name <span className="text-muted fw-normal">(For your personalized pass)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted px-2.5">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Razal Rahman"
                      className="form-control border-start-0 ps-1"
                      id="modal-name-input"
                      autoCapitalize="words"
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
                      inputMode="tel"
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
                  style={{ touchAction: 'manipulation' }}
                >
                  {isLoading ? (
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" />
                      <span>Reserving Your Spot...</span>
                    </div>
                  ) : (
                    <>
                      <span>Reserve My Spot</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : showPassCard ? (
            /* ========================================================== */
            /* 2. ACCURATE & PHONE-FRIENDLY WAITLIST PASS CARD SCREEN     */
            /* ========================================================== */
            <div
              className="p-3 p-sm-4 text-center position-relative tz-pass-card-wrapper d-flex flex-column align-items-center"
              style={{
                padding: 'clamp(1rem, 3.5vw, 1.5rem)',
              }}
              onTouchStart={() => setIsTimerPaused(true)}
              onTouchEnd={() => setIsTimerPaused(false)}
              onMouseEnter={() => setIsTimerPaused(true)}
              onMouseLeave={() => setIsTimerPaused(false)}
            >
              {/* Phone-optimized Card Frame with generous padding and natural image scaling */}
              <div
                className="position-relative mx-auto overflow-hidden shadow-lg"
                style={{
                  width: 'min(315px, calc(62vh * 0.5625))',
                  maxWidth: 'calc(100vw - 44px)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '22px',
                }}
              >
                {/* Official Pass Background Template (Dual-source: bundled import + public fallback) */}
                <img
                  src={passImageSource}
                  alt="TravelZync Official Waitlist Pass"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '22px',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'none',
                  }}
                  onError={(e) => {
                    if (e.target.src !== '/travelzync_waitlist_pass_template.png') {
                      e.target.src = '/travelzync_waitlist_pass_template.png';
                    }
                  }}
                />

                {/* Auto-closing Countdown Badge (shows 'Paused' while holding on phone) */}
                <div
                  className="position-absolute d-flex align-items-center gap-1.5 px-2.5 py-1.5 rounded-pill shadow-sm"
                  style={{
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.82)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    zIndex: 20,
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className={`rounded-circle d-inline-block ${isTimerPaused ? 'bg-warning' : 'bg-danger'}`}
                    style={{ width: '6px', height: '6px' }}
                  />
                  <span>
                    {isTimerPaused ? 'Paused' : `Closing in ${passCountdown}s`}
                  </span>
                </div>

                {/* Generous Phone-Friendly Closing Tab (Right Corner) */}
                <button
                  type="button"
                  onClick={handleClosePassCard}
                  className="btn btn-light rounded-circle shadow-lg position-absolute d-flex align-items-center justify-content-center p-0"
                  style={{
                    top: '12px',
                    right: '12px',
                    width: '38px',
                    height: '38px',
                    minWidth: '38px',
                    minHeight: '38px',
                    zIndex: 25,
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    color: '#0f172a',
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                  }}
                  title="Close pass card"
                  aria-label="Close pass card"
                >
                  <X size={18} strokeWidth={2.4} />
                </button>

                {/* Accurate Dynamic Username Overlay - Exactly in place of 'Razal Rahman' */}
                <div
                  className="position-absolute"
                  style={{
                    top: '34.8%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '84%',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
                      fontWeight: 800,
                      color: '#0f172a',
                      fontSize: `calc(${nameScale} * clamp(13px, 4.2vw, 17px))`,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {displayName}
                  </div>
                </div>
              </div>

              {/* Phone-optimized Action Buttons Bar with Good Padding */}
              <div
                className="d-flex align-items-center justify-content-center gap-2.5 mt-3 w-100"
                style={{ maxWidth: '315px' }}
              >
                <button
                  type="button"
                  className="btn btn-dark rounded-pill py-2.5 px-3.5 small d-flex align-items-center justify-content-center gap-2 flex-grow-1 fw-bold shadow-sm"
                  onClick={handleShareOrDownloadPass}
                  style={{
                    fontSize: '0.84rem',
                    touchAction: 'manipulation',
                    letterSpacing: '-0.01em',
                  }}
                >
                  <Download size={15} />
                  <span>Save / Share Pass</span>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill py-2.5 px-3.5 small d-flex align-items-center justify-content-center gap-1.5 fw-semibold"
                  onClick={handleClosePassCard}
                  style={{
                    fontSize: '0.84rem',
                    touchAction: 'manipulation',
                    borderWidth: '1.5px',
                  }}
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================== */
            /* 3. SPOT CONFIRMED SUCCESS DETAILS SCREEN                   */
            /* ========================================================== */
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

              {/* View Personalized Pass Button */}
              <button
                type="button"
                className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-pill fw-bold w-100 mb-2.5 shadow-sm"
                onClick={() => setShowPassCard(true)}
                style={{ borderWidth: '1.5px', touchAction: 'manipulation' }}
              >
                <Sparkles size={16} />
                <span>View Your Personalized Pass</span>
              </button>

              {/* Viral Share Buttons */}
              <div className="d-flex flex-column gap-2 mb-3">
                <button
                  className="btn btn-success d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-pill fw-semibold"
                  onClick={handleWhatsAppShare}
                  style={{ touchAction: 'manipulation' }}
                >
                  <Share2 size={16} />
                  <span>Share with Friends on WhatsApp</span>
                </button>

                <button
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 py-2 rounded-pill small fw-semibold"
                  onClick={handleCopyShare}
                  style={{ touchAction: 'manipulation' }}
                >
                  {copiedLink ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Referral Link'}</span>
                </button>
              </div>

              <button
                className="btn btn-dark rounded-pill px-4 py-2 small"
                onClick={handleFullClose}
                style={{ touchAction: 'manipulation' }}
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
