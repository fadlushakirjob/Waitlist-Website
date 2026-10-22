import React from 'react';
import {
  Compass,
  Target,
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
    <section id="about" className="section-padding bg-white position-relative" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <div className="tz-container">
        <div className="row align-items-center gy-4 gx-lg-5">
          {/* Left: About Copy & Story */}
          <div className="col-lg-6">
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 mb-2.5 rounded-pill bg-tz-red-light border border-danger-subtle">
              <Compass size={14} className="text-tz-red" />
              <span className="text-tz-red fw-bold" style={{ fontSize: '0.75rem' }}>
                ABOUT TRAVELZYNC LABS
              </span>
            </div>

            <h2
              className="fw-extrabold text-dark mb-3 tracking-tight"
              style={{ fontSize: '2.2rem', lineHeight: 1.2, letterSpacing: '-0.5px' }}
            >
              Transforming Kerala’s Commute, <br />
              <span style={{ color: '#ED1C24' }}>One Journey at a Time</span>
            </h2>

            <p className="lead text-secondary mb-3" style={{ fontSize: '1rem', lineHeight: 1.65 }}>
              Public transportation is the lifeblood of Kerala. Millions of students, professionals,
              and families rely daily on over 12,000 private and KSRTC buses to move across cities,
              towns, and villages.
            </p>

            <p className="text-muted small mb-4" style={{ lineHeight: 1.65, fontSize: '0.9rem' }}>
              Yet, daily commuters face constant uncertainty: unpredictable arrival times, missed
              connections, and the friction of physical cash transactions.
              <strong className="text-dark"> TravelZync Labs Private Limited</strong> was founded with
              a single purpose: to build an AI-powered, connected transit ecosystem that makes every
              trip predictable, seamless, and stress-free.
            </p>

            {/* Core Pillars */}
            <div className="d-flex flex-wrap gap-2.5 mb-4">
              <div className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-light border">
                <Target size={15} className="text-danger" />
                <span className="fw-semibold text-dark small" style={{ fontSize: '0.8rem' }}>AI Route Intelligence</span>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-light border">
                <TrendingUp size={15} className="text-danger" />
                <span className="fw-semibold text-dark small" style={{ fontSize: '0.8rem' }}>Digitizing 300+ Private Buses</span>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-light border">
                <MapPin size={15} className="text-danger" />
                <span className="fw-semibold text-dark small" style={{ fontSize: '0.8rem' }}>Rooted in Kerala</span>
              </div>
            </div>

            <div>
              <button
                className="btn btn-tz-primary px-4 py-2"
                onClick={onOpenWaitlist}
              >
                <span>Join the Movement</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right: The Transformation Matrix Card */}
          <div className="col-lg-6">
            <div
              className="p-4 rounded-4 border shadow-2xs position-relative overflow-hidden"
              style={{
                background: '#FAFAFA',
                borderColor: '#E5E7EB',
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h5 className="fw-bold fs-6 text-dark mb-0">The Problem & Our Solution</h5>
                <span className="badge rounded-pill bg-danger text-white py-1 px-2.5 small" style={{ fontSize: '0.7rem' }}>
                  IMPACT DRIVEN
                </span>
              </div>

              <div className="d-flex flex-column gap-2.5">
                {painPoints.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-3 bg-white border shadow-2xs"
                    style={{ borderColor: '#F1F5F9' }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <AlertCircle size={14} className="text-danger flex-shrink-0" />
                      <span className="fw-bold text-dark small" style={{ fontSize: '0.825rem' }}>
                        {item.problem}
                      </span>
                    </div>
                    <div className="d-flex align-items-start gap-2 ps-3.5">
                      <CheckCircle size={13} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted small" style={{ fontSize: '0.775rem', lineHeight: 1.45 }}>
                        {item.solution}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tagline Footer inside card */}
              <div className="mt-3 pt-2.5 border-top text-center">
                <span className="font-script fs-5 text-tz-red fw-bold">
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
