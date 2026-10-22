import React, { useState } from 'react';
import {
  Award,
  Users2,
  Building2,
  ExternalLink,
  ChevronRight,
  X,
  Quote,
} from 'lucide-react';
import {
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  XTwitterIcon,
} from './SocialIcons';

export default function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    {
      id: 'nit-calicut',
      title: 'Best Startup Runner-up',
      subtitle: 'NIT Calicut Recognition',
      institution: 'National Institute of Technology Calicut',
      date: 'Milestone Achievement',
      image: '/Best Startup Runner up- NIT- Calicut_p1_img1.jpeg',
      badge: 'Prestigious Award',
      shortDesc:
        'Recognized as the Best Startup Runner-Up at NIT Calicut, validating TravelZync’s technology-driven approach to solving public transportation challenges.',
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
      title: 'Discussions for KSRTC Integration',
      subtitle: 'Meeting with Shri P. K. Kunhalikutty',
      institution: 'Kerala Leadership & Transit Integration',
      date: 'Strategic Discussion',
      image: '/Best Startup Runner up- NIT- Calicut_p3_img1.jpeg',
      badge: 'Government Engagement',
      shortDesc:
        'Engaged in high-level discussions exploring opportunities for technology-driven public transportation and state-wide transit integration.',
      fullText: [
        'An important moment in the journey of TravelZync Labs was the opportunity to meet Shri P. K. Kunhalikutty, a prominent political leader from Kerala.',
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
      title: 'Showcased to Transport Minister',
      subtitle: 'Hon’ble Transport Minister of Kerala',
      institution: 'Ministry of Transport, Kerala',
      date: 'Institutional Presentation',
      image: '/Best Startup Runner up- NIT- Calicut_p2_img1.jpeg',
      badge: 'Ministerial Presentation',
      shortDesc:
        'Presented TravelZync’s AI-powered mobility platform directly to the Hon’ble Transport Minister of Kerala to modernize passenger experience.',
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

  return (
    <section
      id="achievements"
      className="section-padding bg-white position-relative"
      style={{ borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row md:items-end justify-content-between mb-4 pb-2">
          <div>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-2 rounded-pill bg-tz-red-light border border-danger-subtle">
              <Award size={15} className="text-tz-red" />
              <span className="text-tz-red fw-bold" style={{ fontSize: '0.8rem' }}>
                VERIFIED MILESTONES
              </span>
            </div>
            <h2
              className="fw-bold tracking-tight text-dark mb-2"
              style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}
            >
              Our Achievements
            </h2>
            <p className="text-muted mb-0" style={{ maxWidth: '600px' }}>
              Genuine milestones and institutional interactions driving TravelZync forward.
              Recognized by premier technical universities and state policymakers.
            </p>
          </div>
        </div>

        {/* 3 Authentic Cards + Follow Our Journey Column */}
        <div className="row g-4 align-items-stretch">
          {/* Left: 3 Achievement Cards */}
          <div className="col-lg-9">
            <div className="row g-3">
              {achievements.map((item) => (
                <div key={item.id} className="col-md-4">
                  <div
                    className="tz-card h-100 d-flex flex-column overflow-hidden cursor-pointer"
                    onClick={() => setSelectedAchievement(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Authentic Photo from PDF */}
                    <div
                      className="position-relative overflow-hidden"
                      style={{ height: '175px', backgroundColor: '#F3F4F6' }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-100 h-100 object-fit-cover transition-transform duration-300 hover-zoom"
                        style={{ objectPosition: 'center top' }}
                      />
                      <span
                        className="position-absolute top-2 start-2 badge bg-dark/80 text-white backdrop-blur-sm px-2 py-1 rounded-pill"
                        style={{ fontSize: '0.7rem', top: '8px', left: '8px' }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <h3
                        className="fw-bold text-dark fs-6 mb-1 text-truncate"
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <div className="text-tz-red fw-semibold small mb-2" style={{ fontSize: '0.8rem' }}>
                        {item.subtitle}
                      </div>
                      <p
                        className="text-muted small flex-grow-1 mb-3"
                        style={{
                          fontSize: '0.825rem',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.shortDesc}
                      </p>

                      <div className="pt-2 border-top d-flex align-items-center justify-content-between text-tz-red fw-bold small">
                        <span>Read Full Story</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: "Follow Our Journey" Box (from mockup) */}
          <div className="col-lg-3">
            <div
              className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between"
              style={{
                background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
                color: '#ffffff',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
              }}
            >
              <div>
                <span className="badge bg-danger text-white py-1 px-2 rounded-pill small mb-2">
                  CONNECT WITH US
                </span>
                <h4 className="fw-bold fs-5 text-white mb-2">Follow Our Journey</h4>
                <p className="text-gray-400 small mb-4" style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
                  Stay tuned for live pilot launches, private bus onboardings, and technology releases across Kerala.
                </p>

                {/* Social Media Links */}
                <div className="d-flex flex-column gap-2">
                  <a
                    href="https://linkedin.com/company/travelzync"
                    target="_blank"
                    rel="noreferrer"
                    className="d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="rounded-circle p-1 bg-primary d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                      <LinkedInIcon size={14} color="#ffffff" />
                    </div>
                    <span className="small fw-semibold">LinkedIn / TravelZync</span>
                  </a>

                  <a
                    href="https://instagram.com/travelzync"
                    target="_blank"
                    rel="noreferrer"
                    className="d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', background: '#E1306C' }}>
                      <InstagramIcon size={14} color="#ffffff" />
                    </div>
                    <span className="small fw-semibold">Instagram / @travelzync</span>
                  </a>

                  <a
                    href="https://youtube.com/@travelzync"
                    target="_blank"
                    rel="noreferrer"
                    className="d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="rounded-circle p-1 bg-danger d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                      <YouTubeIcon size={14} color="#ffffff" />
                    </div>
                    <span className="small fw-semibold">YouTube / TravelZync</span>
                  </a>

                  <a
                    href="https://x.com/travelzync"
                    target="_blank"
                    rel="noreferrer"
                    className="d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="rounded-circle p-1 bg-dark d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                      <XTwitterIcon size={14} color="#ffffff" />
                    </div>
                    <span className="small fw-semibold">X (Twitter) / @travelzync</span>
                  </a>
                </div>
              </div>

              <div className="pt-3 border-top border-secondary mt-3">
                <span className="font-script fs-5 text-white-50">
                  Your journey perfectly synced.
                </span>
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
          style={{ backgroundColor: 'rgba(17, 24, 39, 0.75)', zIndex: 1060 }}
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
              {/* Header with Photo */}
              <div className="position-relative" style={{ maxHeight: '340px', overflow: 'hidden' }}>
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-100 object-fit-cover"
                  style={{ maxHeight: '340px' }}
                />
                <button
                  type="button"
                  className="btn btn-dark rounded-circle position-absolute top-3 end-3 p-1 d-flex align-items-center justify-content-center shadow"
                  style={{ top: '16px', right: '16px', width: '36px', height: '36px' }}
                  onClick={() => setSelectedAchievement(null)}
                >
                  <X size={20} />
                </button>
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)',
                  }}
                >
                  <span className="badge bg-danger rounded-pill px-3 py-1 mb-2">
                    {selectedAchievement.badge}
                  </span>
                  <h3 className="fw-bold mb-1">{selectedAchievement.title}</h3>
                  <p className="small mb-0 text-white-50">{selectedAchievement.institution}</p>
                </div>
              </div>

              {/* Body Text */}
              <div className="modal-body p-4 p-md-5" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <div className="d-flex align-items-center gap-2 mb-4 p-3 rounded-3 bg-tz-red-light border border-danger-subtle">
                  <Quote size={24} className="text-tz-red flex-shrink-0" />
                  <span className="fw-semibold text-dark small">
                    Official record from TravelZync Labs milestone archive.
                  </span>
                </div>

                <div className="achievement-narrative">
                  {selectedAchievement.fullText.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-secondary"
                      style={{
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        fontWeight: paragraph.startsWith('Exploring') || paragraph.startsWith('TravelZync Labs —') ? 700 : 400,
                        color: paragraph.startsWith('TravelZync Labs —') ? '#ED1C24' : '#374151',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer bg-light px-4 py-3 d-flex justify-content-between align-items-center">
                <span className="font-script fs-5 text-muted">
                  TravelZync Labs Private Limited
                </span>
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={() => setSelectedAchievement(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
