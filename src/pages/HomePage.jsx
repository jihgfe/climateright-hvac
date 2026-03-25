import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

/* ── Animated counter hook ── */
function useAnimatedCounter(target, duration = 1800, isActive = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isActive]);
  return count;
}

const SERVICES = [
  {
    icon: '❄️',
    title: 'AC Repair & Service',
    desc: 'Fast diagnostics and repairs for all AC brands. From refrigerant recharge to compressor replacement — we fix it right the first time.',
    link: '/services#ac-repair',
  },
  {
    icon: '🔧',
    title: 'AC Installation',
    desc: 'New high-efficiency system installation with proper load calculation, permits, and manufacturer warranty. Free estimates.',
    link: '/services#ac-install',
  },
  {
    icon: '🔥',
    title: 'Heating Repair',
    desc: 'Furnace, heat pump, and boiler repairs. We diagnose and fix gas, electric, and heat pump systems quickly and safely.',
    link: '/services#heating-repair',
  },
  {
    icon: '🏠',
    title: 'Heating Installation',
    desc: 'Energy-efficient gas furnace, heat pump, and electric system installations. Proper sizing guaranteed.',
    link: '/services#heating-install',
  },
  {
    icon: '🚨',
    title: 'Emergency Service',
    desc: '24/7 emergency response with a guaranteed 2-hour arrival window. No extra charge for nights or weekends.',
    link: '/services#emergency',
  },
  {
    icon: '🛡️',
    title: 'Maintenance Plans',
    desc: 'Silver, Gold, and Platinum plans starting at $149/yr. Prevent breakdowns and keep your system running at peak efficiency.',
    link: '/services#maintenance',
  },
];

const WHY = [
  { icon: '📋', title: 'Licensed & Insured', desc: 'TX License #TX-HVAC-2847. Fully licensed, bonded, and insured for your protection and peace of mind.' },
  { icon: '⚡', title: 'Same-Day Service', desc: "We know HVAC problems can't wait. Same-day appointments available for most repairs and diagnostics." },
  { icon: '✅', title: '100% Satisfaction', desc: "If you're not completely satisfied, we'll make it right. That's our ClimateRight promise to every customer." },
  { icon: '💰', title: 'Upfront Pricing', desc: 'We provide a full written estimate before any work begins. No hidden fees, no surprise invoices — ever.' },
  { icon: '🎓', title: 'Factory-Trained Techs', desc: 'NATE-certified technicians trained by leading manufacturers. We stay current on the latest equipment and technology.' },
  { icon: '💳', title: 'Financing Available', desc: '0% interest financing for up to 18 months on qualifying new systems. Get the comfort you need, now.' },
];

const TESTIMONIALS = [
  {
    text: "My AC died on the hottest day of the year. ClimateRight had a tech out within 2 hours and it was fixed by afternoon. Incredible service — I can't recommend them enough!",
    name: 'Sarah M.',
    initials: 'SM',
    color: '#0052A5',
    location: 'Dallas, TX',
    date: 'July 2024',
  },
  {
    text: "Finally an HVAC company that shows up on time and does the job right the first time. Been using them for 6 years. They've replaced our whole system and do our annual tune-ups. Wouldn't go anywhere else.",
    name: 'Robert T.',
    initials: 'RT',
    color: '#FF6B2B',
    location: 'Plano, TX',
    date: 'May 2024',
  },
  {
    text: 'The technician was professional, explained everything clearly, and the final price was exactly what they quoted. No upselling, no pressure. Five stars, absolutely deserved.',
    name: 'Jennifer L.',
    initials: 'JL',
    color: '#16A34A',
    location: 'Arlington, TX',
    date: 'September 2024',
  },
];

const AREAS = ['Dallas', 'Fort Worth', 'Plano', 'Irving', 'Garland', 'Mesquite', 'Arlington', 'McKinney'];

export default function HomePage() {
  const navigate = useNavigate();

  /* Hero form controlled state */
  const [heroForm, setHeroForm] = useState({ service: '', name: '', phone: '', city: '' });
  const updateHero = (field, val) => setHeroForm((p) => ({ ...p, [field]: val }));

  const handleHeroBook = () => {
    sessionStorage.setItem('heroBooking', JSON.stringify(heroForm));
    navigate('/appointments');
  };

  /* Animated counters — trigger when stats bar enters view */
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const yearsCount  = useAnimatedCounter(20,  1400, statsVisible);
  const custCount   = useAnimatedCounter(15,   1600, statsVisible);
  const ratingCount = useAnimatedCounter(49,  1000, statsVisible); // displayed as X/10 → 4.9
  const hoursLabel  = '24/7';

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__content">
              <span className="hero__badge">
                ⭐ Trusted Since 2003 · Now Booking Spring Tune-Ups
              </span>
              <h1 className="hero__title">
                Dallas's Most Trusted<br />
                <span>HVAC Service</span>
              </h1>
              <p className="hero__subtitle">
                Licensed, NATE-certified technicians delivering fast, reliable heating and
                cooling solutions — with 24/7 emergency availability and upfront pricing you can trust.
              </p>

              {/* Urgency pill */}
              <div className="hero__urgency">
                <span className="hero__urgency-dot" />
                Same-Day Slots Available Today — Book Before They Fill Up
              </div>

              <div className="hero__ctas">
                <Link to="/appointments" className="btn btn-orange">
                  📅 Schedule Service
                </Link>
                <a href="tel:5552345678" className="btn btn-outline-white">
                  📞 Call Now
                </a>
              </div>
              <div className="hero__trust">
                <span className="hero__trust-item"><span className="icon">✔️</span> 20+ Years Experience</span>
                <span className="hero__trust-item"><span className="icon">✔️</span> NATE Certified</span>
                <span className="hero__trust-item"><span className="icon">✔️</span> 24/7 Emergency</span>
                <span className="hero__trust-item"><span className="icon">✔️</span> Upfront Pricing</span>
              </div>
            </div>

            <div className="hero__card">
              <p className="hero__card-title">🗓️ Request a Service Call</p>
              <div className="hero__card-form">
                <select
                  className="hero__card-input"
                  value={heroForm.service}
                  onChange={(e) => updateHero('service', e.target.value)}
                >
                  <option value="" disabled>Select Service Type</option>
                  <option>AC Repair</option>
                  <option>AC Installation</option>
                  <option>Heating Repair</option>
                  <option>Heating Installation</option>
                  <option>Maintenance Tune-Up</option>
                  <option>Emergency Service</option>
                  <option>Other</option>
                </select>
                <input
                  className="hero__card-input"
                  type="text"
                  placeholder="Your Name"
                  value={heroForm.name}
                  onChange={(e) => updateHero('name', e.target.value)}
                />
                <input
                  className="hero__card-input"
                  type="tel"
                  placeholder="Phone Number"
                  value={heroForm.phone}
                  onChange={(e) => updateHero('phone', e.target.value)}
                />
                <input
                  className="hero__card-input"
                  type="text"
                  placeholder="City / Zip Code"
                  value={heroForm.city}
                  onChange={(e) => updateHero('city', e.target.value)}
                />
                <button
                  className="btn btn-orange hero__card-btn"
                  onClick={handleHeroBook}
                >
                  Book My Appointment →
                </button>
                <p className="hero__card-note">⚡ We'll confirm within 1 hour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Strip */}
      <div className="promo-strip">
        <div className="container">
          <div className="promo-strip__inner">
            <span className="promo-strip__tag">🌸 Spring Special</span>
            <span className="promo-strip__text">
              AC Tune-Up &amp; Safety Check — <strong>$69</strong> <s style={{ opacity: 0.6 }}>$99</s> · Limited slots available this week
            </span>
            <Link to="/appointments" className="promo-strip__cta">Claim Offer →</Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="stats-bar" ref={statsRef}>
        <div className="container">
          <div className="stats-bar__inner">
            <div className="stats-bar__item">
              <span className="stats-bar__number">{yearsCount}+</span>
              <span className="stats-bar__label">Years Experience</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__number">{custCount}K+</span>
              <span className="stats-bar__label">Customers Served</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__number">{(ratingCount / 10).toFixed(1)}★</span>
              <span className="stats-bar__label stats-bar__label--reviews">
                Google Reviews
                <span className="stats-bar__review-count">(2,400+)</span>
              </span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__number">{hoursLabel}</span>
              <span className="stats-bar__label">Emergency Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="container">
          <div className="trust-badges__inner">
            <div className="trust-badge">
              <span className="trust-badge__icon">🏆</span>
              <div>
                <div className="trust-badge__title">BBB A+ Rating</div>
                <div className="trust-badge__sub">Accredited Business</div>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-badge__icon">🎓</span>
              <div>
                <div className="trust-badge__title">NATE Certified</div>
                <div className="trust-badge__sub">All Technicians</div>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-badge__icon">📜</span>
              <div>
                <div className="trust-badge__title">TX Licensed</div>
                <div className="trust-badge__sub">#TX-HVAC-2847</div>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-badge__icon">🌿</span>
              <div>
                <div className="trust-badge__title">EPA 608 Certified</div>
                <div className="trust-badge__sub">Refrigerant Handling</div>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-badge__icon">🛡️</span>
              <div>
                <div className="trust-badge__title">Fully Insured</div>
                <div className="trust-badge__sub">Licensed &amp; Bonded</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header">
            <span className="badge">Our Services</span>
            <h2 className="section-title">Everything Your HVAC System Needs</h2>
            <p className="section-subtitle">
              From routine maintenance to full system replacements, ClimateRight handles every heating and cooling need in the DFW area.
            </p>
          </div>
          <div className="services-preview__grid">
            {SERVICES.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <Link to={s.link} className="service-card__link">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="why-choose">
        <div className="container">
          <div className="section-header">
            <span className="badge">Why ClimateRight</span>
            <h2 className="section-title">The ClimateRight Difference</h2>
            <p className="section-subtitle">
              We've built our reputation on doing the right thing — for over 20 years.
            </p>
          </div>
          <div className="why-choose__grid">
            {WHY.map((w) => (
              <div className="why-card" key={w.title}>
                <div className="why-card__icon">{w.icon}</div>
                <h3 className="why-card__title">{w.title}</h3>
                <p className="why-card__desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ background: 'rgba(255,107,43,0.15)', color: '#ffaa7a', border: '1px solid rgba(255,107,43,0.3)' }}>Customer Reviews</span>
            <h2 className="section-title">What Dallas Says About Us</h2>
            <p className="section-subtitle">
              Don't take our word for it — here's what our neighbors across DFW are saying.
            </p>
          </div>
          <div className="testimonials__grid">
            {TESTIMONIALS.map((t) => (
              <div className="testimonial-card" key={t.name}>
                <div className="testimonial-card__stars">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} style={{ color: '#F59E0B' }}>{s}</span>
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div
                    className="testimonial-card__avatar"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__location">{t.location} · {t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials__footer">
            <span className="testimonials__review-note">
              ⭐ Based on 2,400+ verified Google &amp; Yelp reviews
            </span>
            <Link to="/appointments" className="btn btn-orange">
              Join Our Happy Customers →
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="service-areas">
        <div className="container">
          <div className="section-header">
            <span className="badge">Coverage</span>
            <h2 className="section-title">Serving the DFW Metroplex</h2>
          </div>
          <p className="service-areas__since">Proudly serving Dallas-Fort Worth since 2003</p>
          <div className="service-areas__grid">
            {AREAS.map((city) => (
              <span key={city} className="service-areas__chip">
                📍 {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__title">Ready for Year-Round Comfort?</h2>
          <p className="cta-banner__text">
            Join 15,000+ DFW homeowners who trust ClimateRight for all their heating and cooling needs.
          </p>
          <div className="cta-banner__actions">
            <Link to="/appointments" className="btn btn-orange">
              📅 Schedule Your Service Today
            </Link>
            <a href="tel:5552345678" className="btn btn-outline-white">
              📞 (555) 234-5678
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
