import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Bus } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'commuter', // commuter, bus_operator, partner
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
      <div className="container">
        <div className="row gy-5 align-items-center">
          {/* Contact Details */}
          <div className="col-lg-5 pe-lg-4">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-tz-red-light border border-danger-subtle">
              <Mail size={15} className="text-tz-red" />
              <span className="text-tz-red fw-bold" style={{ fontSize: '0.8rem' }}>
                GET IN TOUCH
              </span>
            </div>

            <h2 className="display-6 fw-extrabold text-dark mb-3 tracking-tight">
              Have Questions or Operate a Bus Fleet?
            </h2>

            <p className="text-muted mb-4" style={{ lineHeight: 1.6 }}>
              Whether you are a regular commuter wanting TravelZync on your route, or a private
              bus operator interested in our free GPS integration kit, our team is ready to connect.
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-white border">
                <div
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: '#ED1C24', width: '36px', height: '36px' }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <div className="fw-semibold text-dark small">Official Email</div>
                  <a
                    href="mailto:contact@travelzync.com"
                    className="text-decoration-none text-tz-red fw-bold small"
                  >
                    contact@travelzync.com
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-white border">
                <div
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: '#ED1C24', width: '36px', height: '36px' }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="fw-semibold text-dark small">Headquarters</div>
                  <div className="text-muted small">
                    TravelZync Labs Private Limited <br />
                    Calicut (Kozhikode) & Kochi, Kerala, India
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-white border">
                <div
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: '#ED1C24', width: '36px', height: '36px' }}
                >
                  <Bus size={18} />
                </div>
                <div>
                  <div className="fw-semibold text-dark small">Bus Operators Onboarding</div>
                  <div className="text-muted small">
                    Priority GPS telemetry hardware & digital ticketing setup for fleet owners.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="col-lg-7">
            <div className="tz-card p-4 p-md-5 bg-white border shadow-sm rounded-4">
              <h4 className="fw-bold text-dark mb-1">Send Us a Direct Message</h4>
              <p className="text-muted small mb-4">
                Fill in the details below and a TravelZync representative will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="alert alert-success d-flex align-items-center gap-2 py-3 px-4 rounded-3">
                  <CheckCircle size={20} className="text-success flex-shrink-0" />
                  <div>
                    <strong>Message received!</strong> Thank you for reaching out to TravelZync Labs.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Your Name</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="e.g. Anjali Nair"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Email Address</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        placeholder="anjali@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">I am reaching out as a:</label>
                    <select
                      className="form-select text-dark"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="commuter">Regular Commuter / Passenger</option>
                      <option value="bus_operator">Private Bus Owner / Operator</option>
                      <option value="investor">Ecosystem Partner / Institutional</option>
                      <option value="media">Media & Press Inquiry</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold text-dark">Your Message</label>
                    <textarea
                      required
                      rows="4"
                      className="form-control"
                      placeholder="Tell us how we can help or collaborate..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-tz-primary px-4 py-2.5">
                    <Send size={16} />
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
