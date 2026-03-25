import { Link } from 'react-router-dom';
import './AboutPage.css';

const TEAM = [
  {
    name: 'Mike Rodriguez',
    title: 'Founder & Master Technician',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: 'Started ClimateRight in 2003 with one truck and a passion for quality HVAC work. NATE Master Certified with 25+ years in the field.',
  },
  {
    name: 'Lisa Chen',
    title: 'Operations Manager',
    img: 'https://randomuser.me/api/portraits/women/33.jpg',
    bio: 'Keeps ClimateRight running smoothly. Lisa manages scheduling, customer relations, and technician training programs.',
  },
  {
    name: 'Carlos Mendez',
    title: 'Senior HVAC Technician',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'NATE-certified with 12 years of experience. Carlos specializes in complex commercial and residential installations.',
  },
  {
    name: 'Ashley Williams',
    title: 'Customer Service Lead',
    img: 'https://randomuser.me/api/portraits/women/55.jpg',
    bio: 'The voice of ClimateRight. Ashley ensures every customer gets the best experience from first call to final follow-up.',
  },
];

const CERTS = [
  { icon: '🏆', name: 'NATE Certified', desc: 'North American Technician Excellence — the highest HVAC certification in the industry.' },
  { icon: '🌿', name: 'EPA 608 Certified', desc: 'Certified for safe refrigerant handling and compliance with EPA environmental regulations.' },
  { icon: '🤝', name: 'ACCA Member', desc: 'Air Conditioning Contractors of America — committed to professional standards and best practices.' },
  { icon: '⭐', name: 'BBB A+ Rating', desc: 'Accredited member of the Better Business Bureau with an A+ rating since 2005.' },
];

const GALLERY_SEEDS = [80, 1080, 360, 290, 117, 445];

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <span className="badge">Est. 2003</span>
          <h1>About ClimateRight HVAC</h1>
          <p>
            A family-owned, Dallas-based HVAC company built on trust, craftsmanship,
            and a commitment to the communities we serve.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__inner">
            <div className="about-story__image">
              <img
                src="https://picsum.photos/seed/hvac-team/800/600"
                alt="ClimateRight HVAC team"
                loading="lazy"
              />
            </div>
            <div className="about-story__content">
              <span className="badge">Our Story</span>
              <h2>Two Decades of Keeping Dallas Comfortable</h2>
              <p>
                ClimateRight HVAC was founded in 2003 by Mike Rodriguez, a master technician
                who believed that Dallas homeowners deserved better — better service, better
                pricing transparency, and better follow-through than they were getting from
                the big box companies.
              </p>
              <p>
                What started as one truck and a handful of loyal customers has grown into
                a full-service HVAC company serving over 15,000 homes and businesses across
                the Dallas-Fort Worth Metroplex. But our core values haven't changed one bit:
                honest work, fair prices, and treating every customer's home like our own.
              </p>
              <p>
                We're proud to be a local, family-owned business. When you call ClimateRight,
                you're supporting your neighbors — not a faceless corporation. Every technician
                on our team is NATE-certified, background-checked, and trained to deliver
                the ClimateRight standard of excellence.
              </p>
              <div className="about-story__mission">
                <p>
                  "Our mission is simple: to provide the DFW Metroplex with fast, honest,
                  and expert HVAC service that you can count on — every time, without exception."
                  — Mike Rodriguez, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="section-header">
            <span className="badge">The Team</span>
            <h2 className="section-title">Meet the ClimateRight Family</h2>
            <p className="section-subtitle">
              Our team of certified professionals is the backbone of everything we do.
            </p>
          </div>
          <div className="team-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="team-card">
                <img
                  className="team-card__image"
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                />
                <div className="team-card__body">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__title">{member.title}</p>
                  <p className="team-card__bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="about-certs">
        <div className="container">
          <div className="section-header">
            <span className="badge">Credentials</span>
            <h2 className="section-title">Licensed, Certified & Accredited</h2>
            <p className="section-subtitle">
              Our certifications reflect our commitment to professional excellence and ongoing education.
            </p>
          </div>
          <div className="certs-grid">
            {CERTS.map((cert) => (
              <div key={cert.name} className="cert-card">
                <div className="cert-card__icon">{cert.icon}</div>
                <h3 className="cert-card__name">{cert.name}</h3>
                <p className="cert-card__desc">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="about-gallery">
        <div className="container">
          <div className="section-header">
            <span className="badge">Our Work</span>
            <h2 className="section-title">See ClimateRight in Action</h2>
          </div>
          <div className="gallery-grid">
            {GALLERY_SEEDS.map((seed) => (
              <div key={seed} className="gallery-item">
                <img
                  src={`https://picsum.photos/seed/${seed}/600/450`}
                  alt="HVAC installation and service"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Ready to Work With Us?</h2>
          <p className="cta-banner__text">
            Experience the ClimateRight difference. Schedule your service today and join 15,000+ satisfied customers.
          </p>
          <div className="cta-banner__actions">
            <Link to="/appointments" className="btn btn-orange">Schedule Service</Link>
            <Link to="/contact" className="btn btn-outline-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
