import React from 'react';
import {
  Bus,
  Ticket,
  Bot,
  Activity,
  CheckCircle2,
  Navigation,
  CreditCard,
  Sparkles,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function FeaturesSection({ onOpenWaitlist }) {
  const features = [
    {
      icon: <Bus size={28} className="text-white" />,
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
      icon: <Ticket size={28} className="text-white" />,
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
      icon: <Bot size={28} className="text-white" />,
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
      icon: <Activity size={28} className="text-white" />,
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
      className="section-padding position-relative"
      style={{
        background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 pb-2">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-2 rounded-pill bg-tz-red-light border border-danger-subtle">
            <Sparkles size={14} className="text-tz-red" />
            <span className="text-tz-red fw-bold" style={{ fontSize: '0.8rem' }}>
              CUTTING-EDGE TRANSIT TECH
            </span>
          </div>
          <h2
            className="fw-bold tracking-tight text-dark mb-3"
            style={{ fontSize: '2.4rem', letterSpacing: '-0.5px' }}
          >
            Smarter Mobility for Every Commuter
          </h2>
          <p
            className="text-muted mx-auto"
            style={{ fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6 }}
          >
            TravelZync bridges passengers, bus operators, and transit networks into one unified,
            seamless ecosystem built specifically for Kerala's commuting culture.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="row g-4 mb-5">
          {features.map((feat, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div
                className="tz-card h-100 p-4 d-flex flex-column justify-content-between position-relative overflow-hidden"
                style={{
                  border: '1.5px solid #F3F4F6',
                }}
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="rounded-4 p-3 d-flex align-items-center justify-content-center shadow-sm"
                      style={{
                        backgroundColor: feat.color,
                        width: '52px',
                        height: '52px',
                      }}
                    >
                      {feat.icon}
                    </div>
                    <span
                      className="badge rounded-pill bg-light text-secondary border px-2 py-1"
                      style={{ fontSize: '0.725rem', fontWeight: 600 }}
                    >
                      {feat.tag}
                    </span>
                  </div>

                  <h3
                    className="fw-bold text-dark fs-5 mb-2"
                    style={{ letterSpacing: '-0.3px' }}
                  >
                    {feat.title}
                  </h3>

                  <p
                    className="text-muted small mb-4"
                    style={{ fontSize: '0.875rem', lineHeight: 1.6 }}
                  >
                    {feat.description}
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="pt-3 border-top">
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                    {feat.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="d-flex align-items-start gap-2 text-secondary"
                        style={{ fontSize: '0.8rem', lineHeight: 1.4 }}
                      >
                        <CheckCircle2
                          size={15}
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
          className="p-4 p-md-5 rounded-5 text-white d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #111827 0%, #1F2937 60%, #B91C1C 100%)',
          }}
        >
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-danger rounded-pill px-3 py-1">
                PILOT LAUNCHING SOON
              </span>
              <span className="text-white-50 small">Limited Early Tester Access</span>
            </div>
            <h3 className="fw-bold fs-3 text-white mb-1">
              Ready to experience effortless bus travel in Kerala?
            </h3>
            <p className="text-white-50 mb-0" style={{ maxWidth: '560px' }}>
              Join thousands of daily commuters in Kozhikode, Ernakulam, Malappuram, and Trivandrum
              reserving priority access.
            </p>
          </div>
          <button
            className="btn btn-tz-primary px-4 py-3 flex-shrink-0"
            onClick={onOpenWaitlist}
            id="features-join-waitlist-btn"
          >
            <span>Reserve Your Waitlist Spot</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
