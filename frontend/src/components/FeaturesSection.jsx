import React from 'react';
import {
  Bus,
  Ticket,
  Bot,
  Activity,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function FeaturesSection({ onOpenWaitlist }) {
  const features = [
    {
      icon: <Bus size={24} className="text-white" />,
      title: 'Real-Time Bus Tracking',
      tag: 'Live GPS Fleet',
      description:
        'Know exactly where your bus is at any moment. Live vehicle telemetry across private and KSRTC route networks with minute-by-minute stop progression.',
      points: [
        'Live pinpoint GPS location on map',
        'Next stop countdown & arrival notifications',
        'Traffic delay and diversion alerts',
        'Accurate route navigation for unfamiliar stops',
      ],
      color: '#ED1C24',
    },
    {
      icon: <Ticket size={24} className="text-white" />,
      title: 'Digital Ticketing',
      tag: '100% Cashless',
      description:
        'Say goodbye to loose change and crumpled paper slips. Book your bus pass instantly using UPI or mobile wallet and board with a secure QR scan.',
      points: [
        'Instant UPI, card, and digital wallet checkout',
        'Dynamic offline-capable QR boarding pass',
        'Daily, weekly, and monthly commuter passes',
        'Instant refunds and digital receipts history',
      ],
      color: '#ED1C24',
    },
    {
      icon: <Bot size={24} className="text-white" />,
      title: 'AI Travel Assistant',
      tag: 'Smart Journey AI',
      description:
        'Your personalized commute companion. Ask in natural Malayalam or English for the quickest routes, bus connections, or last-mile auto combinations.',
      points: [
        'Intelligent multi-modal journey recommendations',
        'Natural language chat and voice assistance',
        'Automatic alternate route suggestions on delays',
        'Remembers your regular daily commute habits',
      ],
      color: '#ED1C24',
    },
    {
      icon: <Activity size={24} className="text-white" />,
      title: 'Smart ETA and Crowd Prediction',
      tag: 'Predictive Intelligence',
      description:
        'Plan your departure with confidence. Machine learning models predict seat availability and passenger congestion before you reach the bus stop.',
      points: [
        'Dynamic congestion & crowd density indicators',
        'Machine learning ETA factoring historical traffic',
        'Seat availability predictions before boarding',
        'Optimal departure time recommendations',
      ],
      color: '#ED1C24',
    },
  ];

  return (
    <section
      id="features"
      className="section-padding bg-white position-relative"
      style={{ borderBottom: '1px solid var(--tz-border)', scrollMarginTop: '85px' }}
    >
      <div className="tz-container">
        {/* Section Header */}
        <div className="text-center mx-auto mb-4 mb-md-5" style={{ maxWidth: '680px' }}>
          <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 mb-2 rounded-pill bg-tz-red-light border border-danger-subtle">
            <Sparkles size={14} className="text-tz-red" />
            <span className="text-tz-red fw-bold" style={{ fontSize: '0.75rem' }}>
              TRANSIT INTELLIGENCE
            </span>
          </div>
          <h2
            className="fw-extrabold tracking-tight text-dark mb-2"
            style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.2rem)', letterSpacing: '-0.5px' }}
          >
            Smarter Mobility for Every Commuter
          </h2>
          <p
            className="text-secondary mx-auto"
            style={{ fontSize: 'clamp(0.925rem, 1.8vw, 1rem)', lineHeight: 1.6 }}
          >
            TravelZync connects passengers, bus operators, and transit networks into one unified,
            seamless ecosystem built specifically for Kerala's commuting culture.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="row g-3 g-md-4 mb-4 mb-md-5">
          {features.map((feat, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div
                className="tz-card h-100 p-3.5 p-sm-4 d-flex flex-column justify-content-between"
                style={{
                  border: '1px solid var(--tz-border)',
                }}
              >
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="rounded-3 p-2.5 d-flex align-items-center justify-content-center shadow-xs"
                      style={{
                        backgroundColor: feat.color,
                        width: '44px',
                        height: '44px',
                      }}
                    >
                      {feat.icon}
                    </div>
                    <span
                      className="badge rounded-pill bg-light text-secondary border px-2 py-1"
                      style={{ fontSize: '0.7rem', fontWeight: 600 }}
                    >
                      {feat.tag}
                    </span>
                  </div>

                  <h3
                    className="fw-bold text-dark fs-6 mb-2"
                    style={{ letterSpacing: '-0.2px' }}
                  >
                    {feat.title}
                  </h3>

                  <p
                    className="text-muted small mb-3"
                    style={{ fontSize: '0.825rem', lineHeight: 1.5 }}
                  >
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-top">
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                    {feat.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="d-flex align-items-start gap-2 text-secondary"
                        style={{ fontSize: '0.775rem', lineHeight: 1.35 }}
                      >
                        <CheckCircle2
                          size={14}
                          className="text-success flex-shrink-0 mt-0.5"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Banner */}
        <div
          className="p-3.5 p-sm-4 rounded-4 text-white d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 shadow-md"
          style={{
            background: 'linear-gradient(135deg, #111827 0%, #1F2937 60%, #B91C1C 100%)',
          }}
        >
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-danger rounded-pill px-2.5 py-0.5" style={{ fontSize: '0.7rem' }}>
                PILOT LAUNCHING SOON
              </span>
              <span className="text-white-50 small" style={{ fontSize: '0.8rem' }}>
                Limited Early Commuter Spots
              </span>
            </div>
            <h4 className="fw-bold fs-5 text-white mb-1">
              Ready to experience effortless bus travel in Kerala?
            </h4>
            <p className="text-white-50 mb-0 small" style={{ maxWidth: '540px' }}>
              Join thousands of daily commuters in Kozhikode, Ernakulam, Malappuram, and Trivandrum
              reserving priority access.
            </p>
          </div>
          <button
            className="btn btn-tz-primary px-4 py-2.5 flex-shrink-0 w-100 w-md-auto text-nowrap"
            onClick={onOpenWaitlist}
            id="features-join-waitlist-btn"
          >
            <span>Reserve Your Waitlist Spot</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
