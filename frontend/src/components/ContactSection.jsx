import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Bus } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'commuter',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', role: 'commuter', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="section-padding bg-light position-relative">
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

            <div className="d-flex flex-column gap-2.5">
              <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-white border">
                <div
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: '#ED1C24', width: '34px', height: '34px' }}
                >
                  <Mail size={16} />
                </div>
                <div>
                  <div className="fw-semibold text-dark small" style={{ fontSize: '0.8rem' }}>Official Email</div>
                  <a
                    href="mailto:contact@travelzync.com"
                    className="text-decoration-none text-tz-red fw-bold small"
                  >
                    contact@travelzync.com
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-white border">
                <div
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: '#ED1C24', width: '34px', height: '34px' }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="fw-semibold text-dark small" style={{ fontSize: '0.8rem' }}>Headquarters</div>
                  <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
                    TravelZync Labs Private Limited • Calicut & Kochi, Kerala
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-white border">
                <div
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: '#ED1C24', width: '34px', height: '34px' }}
                >
                  <Bus size={16} />
                </div>
                <div>
                  <div className="fw-semibold text-dark small" style={{ fontSize: '0.8rem' }}>Bus Operators Program</div>
                  <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
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
                <div className="alert alert-success d-flex align-items-center gap-2 py-3 px-3 rounded-3 small">
                  <CheckCircle size={18} className="text-success flex-shrink-0" />
                  <div>
                    <strong>Message received!</strong> Thank you for reaching out to TravelZync Labs.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
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

                  <button type="submit" className="btn btn-tz-primary px-3 py-2 btn-sm">
                    <Send size={14} />
                    <span>Send Message</span>
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
