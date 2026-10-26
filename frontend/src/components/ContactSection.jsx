import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Bus, AlertCircle } from 'lucide-react';
import { sendContactInquiry } from '../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'commuter',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');

    const res = await sendContactInquiry(formData);
    setIsSending(false);

    if (res.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', role: 'commuter', message: '' });
    } else {
      setErrorMessage(
        res.data?.message || 'Unable to deliver message right now. Please try again or email us directly at contact@travelzync.com.'
      );
    }
  };

  return (
    <section id="contact" className="section-padding bg-light position-relative" style={{ scrollMarginTop: '85px' }}>
      <div className="tz-container">
        <div className="row gy-4 gx-lg-5 align-items-center">
          {/* Contact Details */}
          <div className="col-lg-5">
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 mb-2.5 rounded-pill bg-tz-red-light border border-danger-subtle">
              <Mail size={14} className="text-tz-red" />
              <span className="text-tz-red fw-bold" style={{ fontSize: '0.75rem' }}>
                GET IN TOUCH
              </span>
            </div>

            <h2 className="fw-extrabold text-dark mb-3 tracking-tight" style={{ fontSize: '2.1rem', letterSpacing: '-0.5px' }}>
              Have Questions or Operate a Bus Fleet?
            </h2>

            <p className="text-muted small mb-4" style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
              Whether you are a regular commuter wanting TravelZync on your route, or a private
              bus operator interested in our free GPS integration kit, our team is ready to connect.
            </p>

            <div className="d-flex flex-column gap-3">
              <div
                className="d-flex align-items-start gap-3 p-3.5 rounded-3 bg-white border shadow-2xs transition-all"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 mt-0.5 shadow-sm"
                  style={{ backgroundColor: '#ED1C24', width: '38px', height: '38px' }}
                >
                  <Mail size={18} />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-bold text-dark small mb-0.5" style={{ fontSize: '0.85rem' }}>
                    Official Email
                  </div>
                  <a
                    href="mailto:contact@travelzync.com"
                    className="text-decoration-none text-tz-red fw-bold small d-inline-block"
                    style={{ fontSize: '0.85rem' }}
                  >
                    contact@travelzync.com
                  </a>
                </div>
              </div>

              <div
                className="d-flex align-items-start gap-3 p-3.5 rounded-3 bg-white border shadow-2xs transition-all"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 mt-0.5 shadow-sm"
                  style={{ backgroundColor: '#ED1C24', width: '38px', height: '38px' }}
                >
                  <MapPin size={18} />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-bold text-dark small mb-0.5" style={{ fontSize: '0.85rem' }}>
                    Headquarters
                  </div>
                  <div className="text-secondary small" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                    TravelZync Labs Private Limited • Calicut & Kochi, Kerala
                  </div>
                </div>
              </div>

              <div
                className="d-flex align-items-start gap-3 p-3.5 rounded-3 bg-white border shadow-2xs transition-all"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 mt-0.5 shadow-sm"
                  style={{ backgroundColor: '#ED1C24', width: '38px', height: '38px' }}
                >
                  <Bus size={18} />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-bold text-dark small mb-0.5" style={{ fontSize: '0.85rem' }}>
                    Bus Operators Program
                  </div>
                  <div className="text-secondary small" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                    Priority GPS telemetry hardware & digital ticketing setup.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="col-lg-7">
            <div className="tz-card p-4 p-md-4 bg-white border shadow-xs rounded-4">
              <h5 className="fw-bold text-dark mb-1">Send Us a Direct Message</h5>
              <p className="text-muted small mb-3" style={{ fontSize: '0.825rem' }}>
                Fill in the details below and a TravelZync representative will respond promptly.
              </p>

              {submitted ? (
                <div className="alert alert-success py-3 px-3 rounded-3 small">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={18} className="text-success flex-shrink-0" />
                    <div>
                      <strong>Message sent successfully!</strong> Thank you for reaching out to TravelZync Labs. An email notification has been dispatched.
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-top border-success-subtle d-flex justify-content-between align-items-center">
                    <span className="text-muted" style={{ fontSize: '0.78rem' }}>
                      We typically respond within 24 business hours.
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0 text-success fw-bold text-decoration-none"
                      style={{ fontSize: '0.8rem' }}
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div className="alert alert-danger d-flex align-items-start gap-2 py-2 px-3 rounded-3 small mb-2.5">
                      <AlertCircle size={16} className="text-danger flex-shrink-0 mt-0.5" />
                      <div>{errorMessage}</div>
                    </div>
                  )}
                  <div className="row g-2.5 mb-2.5">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        className="form-control form-control-sm"
                        placeholder="e.g. Anjali Nair"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        className="form-control form-control-sm"
                        placeholder="anjali@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-2.5">
                    <label className="form-label small fw-semibold text-dark mb-1">I am reaching out as a:</label>
                    <select
                      className="form-select form-select-sm text-dark"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="commuter">Regular Commuter / Passenger</option>
                      <option value="bus_operator">Private Bus Owner / Operator</option>
                      <option value="investor">Ecosystem Partner / Institutional</option>
                      <option value="media">Media & Press Inquiry</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark mb-1">Your Message</label>
                    <textarea
                      required
                      rows="3"
                      className="form-control form-control-sm"
                      placeholder="Tell us how we can help or collaborate..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="btn btn-tz-primary px-3 py-2 btn-sm"
                  >
                    {isSending ? (
                      <span className="spinner-border spinner-border-sm me-1" />
                    ) : (
                      <Send size={14} />
                    )}
                    <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
