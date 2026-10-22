import React, { useState } from 'react';
import {
  X,
  Quote,
  ChevronRight,
  Award,
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
      subtitle: 'NIT Calicut',
      image: '/Best Startup Runner up- NIT- Calicut_p1_img1.jpeg',
      badge: 'NIT Calicut Award',
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
      subtitle: 'Shri P. K. Kunhalikutty',
      image: '/Best Startup Runner up- NIT- Calicut_p3_img1.jpeg',
      badge: 'State Leadership',
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
      subtitle: 'Kerala Transport Ministry',
      image: '/Best Startup Runner up- NIT- Calicut_p2_img1.jpeg',
      badge: 'Ministerial Presentation',
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
      className="py-4 bg-white position-relative"
      style={{ borderBottom: '1px solid #F1F5F9' }}
    >
      <div className="tz-container">
        <div className="row align-items-center gy-3">
          {/* LEFT 75%: "Our Achievements" title + 3 horizontal cards */}
          <div className="col-lg-9">
            <h5
              className="fw-extrabold text-dark mb-2.5 fs-6 tracking-tight text-uppercase"
              style={{ letterSpacing: '0.5px' }}
            >
              Our Achievements
            </h5>

            <div className="row g-2">
              {achievements.map((item) => (
                <div key={item.id} className="col-md-4">
                  <div
                    className="p-2 rounded-3 border bg-white shadow-2xs d-flex align-items-center gap-2.5 cursor-pointer transition-all"
                    style={{
                      cursor: 'pointer',
                      borderColor: '#E5E7EB',
                      minHeight: '66px',
                    }}
                    onClick={() => setSelectedAchievement(item)}
                    title={`Click to read: ${item.title}`}
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-2 flex-shrink-0"
                      style={{
                        width: '56px',
                        height: '46px',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                      }}
                    />

                    {/* Card Title & Subtitle */}
                    <div className="flex-grow-1 overflow-hidden">
                      <div
                        className="fw-bold text-dark lh-sm text-truncate"
                        style={{ fontSize: '0.8rem' }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-muted small text-truncate mt-0.5"
                        style={{ fontSize: '0.7rem' }}
                      >
                        {item.subtitle}
                      </div>
                    </div>

                    <ChevronRight size={14} className="text-muted flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 25%: "Follow Our Journey" + Social Icons Row */}
          <div className="col-lg-3 text-lg-end pt-2 pt-lg-0">
            <h5
              className="fw-extrabold text-dark mb-2.5 fs-6 tracking-tight text-uppercase"
              style={{ letterSpacing: '0.5px' }}
            >
              Follow Our Journey
            </h5>

            <div className="d-flex align-items-center justify-content-lg-end gap-2">
              <a
                href="https://instagram.com/travelzync"
                target="_blank"
                rel="noreferrer"
                className="btn btn-light rounded-circle p-2 text-dark border shadow-2xs"
                title="Instagram"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <InstagramIcon size={16} />
              </a>

              <a
                href="https://linkedin.com/company/travelzync"
                target="_blank"
                rel="noreferrer"
                className="btn btn-light rounded-circle p-2 text-dark border shadow-2xs"
                title="LinkedIn"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <LinkedInIcon size={16} />
              </a>

              <a
                href="https://youtube.com/@travelzync"
                target="_blank"
                rel="noreferrer"
                className="btn btn-light rounded-circle p-2 text-dark border shadow-2xs"
                title="YouTube"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <YouTubeIcon size={16} />
              </a>

              <a
                href="https://x.com/travelzync"
                target="_blank"
                rel="noreferrer"
                className="btn btn-light rounded-circle p-2 text-dark border shadow-2xs"
                title="X (Twitter)"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <XTwitterIcon size={16} />
              </a>
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
              <div className="position-relative" style={{ maxHeight: '320px', overflow: 'hidden' }}>
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-100 object-fit-cover"
                  style={{ maxHeight: '320px' }}
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
                  <p className="small mb-0 text-white-50">{selectedAchievement.subtitle}</p>
                </div>
              </div>

              <div className="modal-body p-4 p-md-5" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <div className="d-flex align-items-center gap-2 mb-4 p-3 rounded-3 bg-tz-red-light border border-danger-subtle">
                  <Quote size={22} className="text-tz-red flex-shrink-0" />
                  <span className="fw-semibold text-dark small">
                    Verified milestone from TravelZync Labs official archive.
                  </span>
                </div>

                <div className="achievement-narrative">
                  {selectedAchievement.fullText.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-secondary"
                      style={{
                        fontSize: '0.975rem',
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

              <div className="modal-footer bg-light px-4 py-2.5 d-flex justify-content-between align-items-center">
                <span className="font-script fs-5 text-muted">
                  TravelZync Labs Private Limited
                </span>
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-4 btn-sm"
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
