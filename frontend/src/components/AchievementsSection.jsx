import React, { useState, useEffect } from 'react';
import {
  X,
  Quote,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  Building2,
  Users,
  CheckCircle2,
  Share2,
  Check,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  XTwitterIcon,
} from './SocialIcons';

export default function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [copied, setCopied] = useState(false);

  const achievements = [
    {
      id: 'nit-calicut',
      category: 'INNOVATION AWARD',
      badge: 'Best Startup Runner-up',
      tagline: 'Premier Institute Recognition',
      title: 'Best Startup Runner-up',
      subtitle: 'NIT Calicut (National Institute of Technology)',
      institution: 'NIT Calicut',
      authorityIcon: Building2,
      impactArea: 'AI Mobility & Commute Innovation',
      status: 'Verified Award Winner',
      image: '/Best Startup Runner up- NIT- Calicut_p1_img1.jpeg',
      summary:
        'Honored as the Best Startup Runner-Up at National Institute of Technology Calicut for pioneering technology-driven solutions to public transportation challenges.',
      keyTakeaway: 'Academic and tech ecosystem validation for TravelZync’s real-time transit model.',
      fullText: [
        'Being recognized as the Best Startup Runner-Up at the National Institute of Technology Calicut (NIT Calicut) was a proud and memorable milestone for TravelZync Labs.',
        'This recognition represents more than an award. It reflects our vision, the dedication behind our work, and our commitment to solving real-world transportation challenges through technology and innovation.',
        'TravelZync was built with a clear mission: to transform the way people experience public transportation. From real-time bus tracking and digital ticketing to AI-powered travel assistance, we are working towards making everyday journeys smarter, simpler, and more convenient.',
        'Receiving this recognition at a prestigious institution like NIT Calicut has strengthened our confidence in the problem we are solving and the impact we aspire to create.',
        'As a growing startup, every milestone reminds us that meaningful innovation begins with identifying real problems, believing in an idea, and consistently working towards making it a reality.',
        'This achievement belongs to everyone who has supported our journey, contributed to our vision, and believed in what we are building.',
        'This is not the destination. It is another step towards transforming public transportation, one journey at a time.',
      ],
    },
    {
      id: 'ksrtc-integration',
      category: 'GOVERNMENT DIALOGUE',
      badge: 'State Leadership Dialogue',
      tagline: 'Public Transport Modernization',
      title: 'Discussions for KSRTC Integration',
      subtitle: "With Hon'ble MLA Najeeb Kanthapuram & State Leaders",
      institution: 'Kerala Legislative Assembly & Transit Leadership',
      authorityIcon: Users,
      impactArea: 'Statewide Fleet GPS & Digital Ticketing',
      status: 'Active Policy Dialogue',
      image: '/Best Startup Runner up- NIT- Calicut_p3_img1.jpeg',
      summary:
        'Strategic consultations exploring the integration of TravelZync live telemetry, route tracking, and cashless ticketing into Kerala’s state public transit system.',
      keyTakeaway: 'High-level engagement on deploying smarter digital infrastructure across Kerala’s commuter network.',
      fullText: [
        'An important moment in the journey of TravelZync Labs was the opportunity to meet Shri P. K. Kunhalikutty and Hon\'ble MLA Najeeb Kanthapuram, prominent political leaders from Kerala.',
        'Exploring Opportunities for Technology-Driven Public Transportation:',
        'The interaction provided an opportunity to share our vision of transforming public transportation through technology and innovation. At TravelZync, we aim to build an AI-powered mobility platform that makes everyday travel smarter, more accessible, and more convenient.',
        'From real-time bus tracking and digital ticketing to AI-powered journey planning, we are working towards addressing the challenges faced by commuters across Kerala.',
        'Interactions with experienced leaders offer valuable perspectives on the transportation ecosystem and the opportunities for innovation within it.',
        'As we continue building TravelZync, our focus remains on developing practical, technology-driven solutions that can contribute to a better public transportation experience.',
        'Every conversation brings a new perspective. Every milestone takes us one step closer to our vision.',
        'TravelZync Labs — Your journey perfectly synced.',
      ],
    },
    {
      id: 'transport-minister',
      category: 'MINISTERIAL SHOWCASE',
      badge: 'Ministerial Presentation',
      tagline: 'High-Level Policy Showcase',
      title: 'Showcased to Transport Minister',
      subtitle: 'Kerala Transport Ministry & State Transit Authorities',
      institution: 'Government of Kerala - Transport Ministry',
      authorityIcon: Award,
      impactArea: 'Ecosystem-Scale Passenger Experience',
      status: 'Official Presentation',
      image: '/Best Startup Runner up- NIT- Calicut_p2_img1.jpeg',
      summary:
        'Official presentation to Kerala’s Transport Ministry demonstrating TravelZync’s unified passenger app and operator telemetry platform to modernize bus travel.',
      keyTakeaway: 'Direct policy-level demonstration on digitizing public and private bus operations.',
      fullText: [
        'This meeting marked an important milestone in TravelZync Labs’ journey towards transforming public transportation through technology and innovation.',
        'Our interaction provided an opportunity to present the vision behind TravelZync, an AI-powered mobility platform designed to make public transportation smarter, more accessible, and more convenient for everyday commuters.',
        'We discussed the potential of technology to improve bus tracking, digital ticketing, journey planning, and the overall passenger experience across Kerala’s transportation network.',
        'As a startup working towards modernizing public transportation, such interactions help us understand the sector’s challenges and explore opportunities for future collaboration.',
        'Our vision is clear: to build a smarter, more connected public transportation ecosystem for Kerala and beyond.',
        'TravelZync Labs — Your journey perfectly synced.',
      ],
    },
  ];

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAchievement) return;
      if (e.key === 'Escape') {
        setSelectedAchievement(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement]);

  const currentIndex = selectedAchievement
    ? achievements.findIndex((a) => a.id === selectedAchievement.id)
    : -1;

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex > -1) {
      const prevIdx = (currentIndex - 1 + achievements.length) % achievements.length;
      setSelectedAchievement(achievements[prevIdx]);
    }
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex > -1) {
      const nextIdx = (currentIndex + 1) % achievements.length;
      setSelectedAchievement(achievements[nextIdx]);
    }
  };

  const handleShare = (e) => {
    if (e) e.stopPropagation();
    if (selectedAchievement) {
      const shareUrl = `${window.location.origin}/#achievements`;
      const text = `Explore TravelZync Labs milestone: ${selectedAchievement.title} (${selectedAchievement.subtitle}) - ${shareUrl}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    }
  };

  return (
    <section
      id="achievements"
      className="section-padding position-relative"
      style={{
        borderBottom: '1px solid var(--tz-border)',
        backgroundColor: 'var(--tz-bg-subtle)',
        scrollMarginTop: '85px',
      }}
    >
      <div className="tz-container">
        {/* SECTION HEADER */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-end mb-4 pb-2 gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 mb-2 rounded-pill bg-tz-red-light border border-danger-subtle">
              <Sparkles size={14} className="text-tz-red" />
              <span
                className="text-tz-red fw-bold text-uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
              >
                Verified Milestones & Credibility
              </span>
            </div>

            <h2
              className="fw-extrabold text-dark mb-2"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
              }}
            >
              Our <span style={{ color: '#ED1C24' }}>Achievements</span>
            </h2>

            <p
              className="text-secondary mb-0"
              style={{
                fontSize: 'clamp(0.925rem, 1.8vw, 1rem)',
                maxWidth: '680px',
                lineHeight: 1.6,
                color: 'var(--tz-text-secondary)',
              }}
            >
              National institute honors, state transit consultations, and official transport ministry
              presentations backing our mission to modernize public mobility in Kerala.
            </p>
          </div>

          {/* QUICK SOCIAL CONNECT PILL */}
          <div
            className="d-inline-flex align-items-center gap-2 p-1.5 px-3 rounded-pill bg-white border shadow-2xs"
            style={{ borderColor: 'var(--tz-border)' }}
          >
            <span className="small text-muted fw-semibold me-1" style={{ fontSize: '0.8rem' }}>
              Follow Us:
            </span>
            <div className="d-flex align-items-center gap-1.5">
              <a
                href="https://instagram.com/travelzync"
                target="_blank"
                rel="noreferrer"
                className="achievement-social-btn achievement-social-instagram"
                style={{ width: '32px', height: '32px' }}
                title="Follow TravelZync on Instagram"
              >
                <InstagramIcon size={15} color="#ffffff" />
              </a>

              <a
                href="https://linkedin.com/company/travelzync"
                target="_blank"
                rel="noreferrer"
                className="achievement-social-btn achievement-social-linkedin"
                style={{ width: '32px', height: '32px' }}
                title="Connect with TravelZync on LinkedIn"
              >
                <LinkedInIcon size={15} color="#ffffff" />
              </a>

              <a
                href="https://youtube.com/@travelzync"
                target="_blank"
                rel="noreferrer"
                className="achievement-social-btn achievement-social-youtube"
                style={{ width: '32px', height: '32px' }}
                title="Subscribe to TravelZync on YouTube"
              >
                <YouTubeIcon size={15} color="#ffffff" />
              </a>

              <a
                href="https://x.com/travelzync"
                target="_blank"
                rel="noreferrer"
                className="achievement-social-btn achievement-social-x"
                style={{ width: '32px', height: '32px' }}
                title="Follow TravelZync on X (Twitter)"
              >
                <XTwitterIcon size={14} color="#ffffff" />
              </a>
            </div>
          </div>
        </div>

        {/* 3 SHOWCASE CARDS */}
        <div className="row g-3 g-md-4 mb-4">
          {achievements.map((item, idx) => {
            const AuthIcon = item.authorityIcon;
            return (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div
                  className="achievement-card h-100 d-flex flex-column shadow-sm"
                  onClick={() => setSelectedAchievement(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedAchievement(item);
                    }
                  }}
                  title={`Click to read: ${item.title}`}
                >
                  {/* Photo Header */}
                  <div className="achievement-img-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="achievement-img"
                    />

                    {/* Gradient Overlay for Top Badges */}
                    <div
                      className="position-absolute top-0 start-0 w-100 p-2.5 p-sm-3 d-flex justify-content-between align-items-center"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
                      }}
                    >
                      <span
                        className="badge glass-pill fw-semibold px-2.5 py-1 rounded-pill"
                        style={{ fontSize: '0.68rem', letterSpacing: '0.4px' }}
                      >
                        {item.category}
                      </span>

                      <span
                        className="badge rounded-pill d-inline-flex align-items-center gap-1 px-2.5 py-1"
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.9)',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        <CheckCircle2 size={12} />
                        Verified
                      </span>
                    </div>

                    {/* Bottom Tag Bar */}
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-2.5 p-sm-3 pt-4 text-white"
                      style={{
                        background:
                          'linear-gradient(0deg, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0) 100%)',
                      }}
                    >
                      <span className="badge bg-danger rounded-pill px-2.5 py-0.5 text-uppercase fw-bold" style={{ fontSize: '0.68rem' }}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-3.5 p-sm-4 d-flex flex-column flex-grow-1">
                    {/* Authority / Partner Header */}
                    <div className="d-flex align-items-center gap-1.5 text-muted small mb-2">
                      <AuthIcon size={14} className="text-tz-red flex-shrink-0" />
                      <span className="fw-semibold lh-sm" style={{ fontSize: '0.78rem' }}>
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h3
                      className="fw-bold text-dark mb-2"
                      style={{
                        fontSize: '1.15rem',
                        lineHeight: 1.35,
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Summary Excerpt */}
                    <p
                      className="text-secondary small mb-3 flex-grow-1"
                      style={{
                        fontSize: '0.86rem',
                        lineHeight: 1.55,
                        color: 'var(--tz-text-secondary)',
                      }}
                    >
                      {item.summary}
                    </p>

                    {/* Key takeaway callout */}
                    <div
                      className="p-2.5 px-3 rounded-3 mb-3 achievement-takeaway"
                      style={{
                        borderLeft: '3px solid #ED1C24',
                      }}
                    >
                      <div
                        className="fw-semibold lh-base"
                        style={{ fontSize: '0.78rem', color: 'var(--tz-dark)' }}
                      >
                        ⚡ {item.keyTakeaway}
                      </div>
                    </div>

                    {/* Interactive Footer CTA */}
                    <div className="pt-2 border-top d-flex align-items-center justify-content-between">
                      <span
                        className="fw-bold text-tz-red d-inline-flex align-items-center gap-1.5 small"
                        style={{ fontSize: '0.82rem' }}
                      >
                        Explore Official Story
                        <ArrowRight size={14} className="achievement-arrow" />
                      </span>
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                        Archive Record #{idx + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMMUNITY BAR */}
        <div
          className="p-3 p-sm-4 rounded-4 border shadow-sm mt-2 position-relative overflow-hidden community-bar"
        >
          <div className="row align-items-center gy-3">
            <div className="col-lg-7">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge community-badge rounded-pill px-2.5 py-0.5 small fw-bold" style={{ fontSize: '0.7rem' }}>
                  COMMUNITY & UPDATES
                </span>
                <span className="text-muted small">Kerala Transit Innovation</span>
              </div>
              <h4 className="fw-bold text-dark mb-1 fs-5">
                Follow Our Journey in Real Time
              </h4>
              <p className="text-secondary small mb-0" style={{ maxWidth: '580px', lineHeight: 1.55 }}>
                Join our community across Kerala as we onboard private bus operators, conduct live route tests,
                and expand digital mobility. Follow <strong className="text-dark">@travelzync</strong> on all major platforms.
              </p>
            </div>

            <div className="col-lg-5 text-lg-end">
              <div className="d-flex align-items-center justify-content-start justify-content-lg-end gap-2 flex-wrap">
                <a
                  href="https://instagram.com/travelzync"
                  target="_blank"
                  rel="noreferrer"
                  className="achievement-social-btn achievement-social-instagram px-3 py-2 text-white fw-semibold small gap-1.5 flex-grow-1 flex-sm-grow-0"
                  title="Follow on Instagram"
                >
                  <InstagramIcon size={16} color="#ffffff" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://linkedin.com/company/travelzync"
                  target="_blank"
                  rel="noreferrer"
                  className="achievement-social-btn achievement-social-linkedin px-3 py-2 text-white fw-semibold small gap-1.5 flex-grow-1 flex-sm-grow-0"
                  title="Connect on LinkedIn"
                >
                  <LinkedInIcon size={16} color="#ffffff" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://youtube.com/@travelzync"
                  target="_blank"
                  rel="noreferrer"
                  className="achievement-social-btn achievement-social-youtube px-3 py-2 text-white fw-semibold small gap-1.5 flex-grow-1 flex-sm-grow-0"
                  title="Subscribe on YouTube"
                >
                  <YouTubeIcon size={16} color="#ffffff" />
                  <span>YouTube</span>
                </a>

                <a
                  href="https://x.com/travelzync"
                  target="_blank"
                  rel="noreferrer"
                  className="achievement-social-btn achievement-social-x px-3 py-2 text-white fw-semibold small gap-1.5 flex-grow-1 flex-sm-grow-0"
                  title="Follow on X"
                >
                  <XTwitterIcon size={15} color="#ffffff" />
                  <span>X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL STORY MODAL */}
      {selectedAchievement && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.78)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1060,
          }}
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
              {/* Modal Header Bar */}
              <div className="modal-header bg-white border-bottom px-3 px-sm-4 py-2.5 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-light text-dark border rounded-pill px-2.5 py-1 fw-semibold" style={{ fontSize: '0.72rem' }}>
                    {selectedAchievement.category}
                  </span>
                  <span className="badge bg-danger rounded-pill px-2.5 py-1 fw-bold" style={{ fontSize: '0.72rem' }}>
                    {currentIndex + 1} of {achievements.length}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-light rounded-circle p-1.5 d-flex align-items-center justify-content-center shadow-2xs"
                    style={{ width: '36px', height: '36px' }}
                    onClick={handleShare}
                    title="Share this milestone"
                  >
                    {copied ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
                  </button>

                  <button
                    type="button"
                    className="btn btn-light rounded-circle p-1.5 d-flex align-items-center justify-content-center shadow-2xs"
                    style={{ width: '36px', height: '36px' }}
                    onClick={() => setSelectedAchievement(null)}
                    title="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Photo Frame */}
              <div
                className="position-relative bg-dark"
                style={{ height: 'clamp(180px, 32vw, 260px)', overflow: 'hidden' }}
              >
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                  }}
                />
              </div>

              {/* Modal Body */}
              <div
                className="modal-body p-3 p-sm-4 p-md-5"
                style={{ overflowY: 'auto' }}
              >
                {/* Milestone Title Header */}
                <div className="mb-3">
                  <span className="badge bg-danger rounded-pill px-2.5 py-1 mb-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                    {selectedAchievement.badge}
                  </span>
                  <h3 className="fw-extrabold text-dark mb-1" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', lineHeight: 1.3 }}>
                    {selectedAchievement.title}
                  </h3>
                  <p className="text-secondary small mb-0 fw-semibold">{selectedAchievement.subtitle}</p>
                </div>
                {/* Copied feedback alert */}
                {copied && (
                  <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-3 small rounded-3">
                    <CheckCircle2 size={16} />
                    <span>Milestone link copied to clipboard!</span>
                  </div>
                )}

                {/* Quick Facts Strip */}
                <div className="row g-2 mb-3 p-2.5 p-sm-3 rounded-3 bg-light border">
                  <div className="col-12 col-sm-4">
                    <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                      INSTITUTION / PARTNER
                    </div>
                    <div className="fw-bold text-dark small">{selectedAchievement.institution}</div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                      KEY FOCUS AREA
                    </div>
                    <div className="fw-bold text-dark small">{selectedAchievement.impactArea}</div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                      ARCHIVE STATUS
                    </div>
                    <div className="fw-bold text-success small d-flex align-items-center gap-1">
                      <CheckCircle2 size={13} />
                      {selectedAchievement.status}
                    </div>
                  </div>
                </div>

                {/* Official archive seal message */}
                <div className="d-flex align-items-center gap-2 mb-3 p-2.5 p-sm-3 rounded-3 bg-tz-red-light border border-danger-subtle">
                  <Quote size={20} className="text-tz-red flex-shrink-0" />
                  <span className="fw-semibold text-dark small">
                    Verified milestone document from TravelZync Labs Private Limited official archive.
                  </span>
                </div>

                {/* Full narrative story text */}
                <div className="achievement-narrative">
                  {selectedAchievement.fullText.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-secondary mb-3"
                      style={{
                        fontSize: '0.925rem',
                        lineHeight: 1.7,
                        fontWeight:
                          paragraph.startsWith('Exploring') ||
                          paragraph.startsWith('TravelZync Labs —')
                            ? 700
                            : 400,
                        color: paragraph.startsWith('TravelZync Labs —') ? '#ED1C24' : 'var(--tz-text-secondary)',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Modal Footer with Carousel and Close */}
              <div className="modal-footer bg-light px-3 px-sm-4 py-2.5 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-1.5">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-pill px-2.5 px-sm-3 d-flex align-items-center gap-1"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={16} />
                    <span className="d-none d-sm-inline">Prev</span>
                  </button>
                  <span className="small text-muted px-1">
                    {currentIndex + 1} / {achievements.length}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-pill px-2.5 px-sm-3 d-flex align-items-center gap-1"
                    onClick={handleNext}
                  >
                    <span className="d-none d-sm-inline">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-dark rounded-pill px-3 px-sm-4 btn-sm fw-semibold"
                    onClick={() => setSelectedAchievement(null)}
                  >
                    Close Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
