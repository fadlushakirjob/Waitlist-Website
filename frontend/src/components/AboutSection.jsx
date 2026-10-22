import React from 'react';
import {
  Compass,
  Target,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';

export default function AboutSection({ onOpenWaitlist }) {
  const painPoints = [
    {
      problem: 'Uncertain Bus Timings & Long Waits',
      solution: 'Live GPS Fleet Tracking with accurate minute-by-minute arrival countdowns.',
    },
    {
      problem: 'Cash & Change Disputes During Rush Hour',
      solution: 'Instant QR code digital ticketing with UPI and mobile wallet compatibility.',
    },
    {
      problem: 'Unclear Connecting Routes & Multi-Modal Gaps',
      solution: 'AI Journey Assistant planning end-to-end bus, auto, and metro transfers.',
    },
    {
      problem: 'Overcrowded Buses & Lack of Seat Visibility',
      solution: 'Predictive crowd intelligence showing coach density before boarding.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-white position-relative">
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* Left: About Copy & Story */}
          <div className="col-lg-6 pe-lg-5">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-tz-red-light border border-danger-subtle">
              <Compass size={15} className="text-tz-red" />
              <span className="text-tz-red fw-bold" style={{ fontSize: '0.8rem' }}>
                ABOUT TRAVELZYNC LABS
              </span>
            </div>

            <h2
              className="display-5 fw-extrabold text-dark mb-4 tracking-tight"
              style={{ fontWeight: 800, letterSpacing: '-0.5px' }}
            >
              Transforming Kerala’s Commute, <br />
              <span style={{ color: '#ED1C24' }}>One Journey at a Time</span>
            </h2>

            <p className="lead text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
              Public transportation is the lifeblood of Kerala. Millions of students, professionals,
              and families rely daily on over 12,000 private and KSRTC buses to move across cities,
              towns, and villages.
            </p>

            <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
              Yet, daily commuters face constant uncertainty: unpredictable arrival times, missed
              connections, and the friction of physical cash transactions.
              <strong className="text-dark"> TravelZync Labs Private Limited</strong> was founded with
              a single purpose: to build an AI-powered, connected transit ecosystem that makes every
              trip predictable, seamless, and stress-free.
            </p>

            {/* Core Pillars */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-light border">
                <Target size={18} className="text-danger" />
                <span className="fw-semibold text-dark small">AI Route Intelligence</span>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-light border">
                <TrendingUp size={18} className="text-danger" />
                <span className="fw-semibold text-dark small">Digitizing 300+ Private Buses</span>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-light border">
                <MapPin size={18} className="text-danger" />
                <span className="fw-semibold text-dark small">Rooted in Kerala</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                className="btn btn-tz-primary px-4 py-2"
                onClick={onOpenWaitlist}
              >
                <span>Join the Movement</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right: The Transformation Matrix Card */}
          <div className="col-lg-6">
            <div
              className="p-4 p-md-5 rounded-5 border shadow-sm position-relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
                borderColor: '#E5E7EB',
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                <h4 className="fw-bold fs-5 text-dark mb-0">The Problem & Our Solution</h4>
                <span className="badge rounded-pill bg-danger text-white py-1 px-3 small">
                  IMPACT DRIVEN
                </span>
              </div>

              <div className="d-flex flex-column gap-3">
                {painPoints.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-4 bg-white border shadow-2xs transition-all hover-border-red"
                    style={{ borderColor: '#F3F4F6' }}
                  >
                    <div className="d-flex align-items-start gap-2 mb-1.5">
                      <AlertCircle size={16} className="text-danger flex-shrink-0 mt-1" />
                      <span className="fw-semibold text-dark small" style={{ fontSize: '0.875rem' }}>
                        {item.problem}
                      </span>
                    </div>
                    <div className="d-flex align-items-start gap-2 ps-4">
                      <CheckCircle size={15} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted small" style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
                        {item.solution}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tagline Footer inside card */}
              <div className="mt-4 pt-3 border-top text-center">
                <span className="font-script fs-4 text-tz-red fw-bold">
                  Your journey perfectly synced.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
