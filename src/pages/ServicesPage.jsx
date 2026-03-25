import { Link } from 'react-router-dom';
import './ServicesPage.css';

const SERVICES = [
  {
    icon: '❄️',
    title: 'AC Repair & Service',
    price: 'From $89 diagnostic',
    desc: 'Is your AC not cooling, making strange noises, or leaking water? Our NATE-certified technicians diagnose and repair all AC brands and models quickly and accurately. The diagnostic fee is waived when you authorize any repair.',
    features: [
      'Full system diagnostics',
      'Refrigerant recharge (EPA 608 certified)',
      'Capacitor & contactor replacement',
      'Fan motor & compressor repairs',
      'Evaporator & condenser coil cleaning',
      'Drain line clearing',
      'All brands serviced',
    ],
    emergency: false,
  },
  {
    icon: '🔧',
    title: 'AC Installation',
    price: 'Free estimates',
    desc: 'Ready for a new, energy-efficient air conditioning system? We handle everything from load calculations and equipment selection to installation, city permits, and startup testing — backed by manufacturer and labor warranties.',
    features: [
      'Manual J load calculation',
      'High-efficiency SEER2 systems',
      'City permit pulled & filed',
      'All brands: Carrier, Lennox, Trane, and more',
      'Full system startup & testing',
      'Manufacturer warranty registration',
      'Financing available',
    ],
    emergency: false,
  },
  {
    icon: '🔥',
    title: 'Heating Repair',
    price: 'From $89 diagnostic',
    desc: 'Don\'t be left in the cold. Whether it\'s a gas furnace, heat pump, or electric system, our technicians have the skills and parts to get your heat back on fast. Same-day service available for most heating repairs.',
    features: [
      'Gas furnace diagnostics & repair',
      'Heat pump repair & refrigerant service',
      'Igniter, flame sensor & control board',
      'Blower motor & belt replacement',
      'Gas valve & pressure testing',
      'Carbon monoxide inspection',
      'Heat exchanger inspection',
    ],
    emergency: false,
  },
  {
    icon: '🏠',
    title: 'Heating Installation',
    price: 'Free estimates',
    desc: 'Upgrade to a modern, high-efficiency heating system and start saving on energy bills. We install gas furnaces, heat pumps, and electric systems sized perfectly for your home.',
    features: [
      'Gas furnace installation (80% & 96% AFUE)',
      'Heat pump & dual-fuel systems',
      'Electric furnace & air handler',
      'Proper sizing & ductwork assessment',
      'Thermostat programming included',
      'City permit & inspection',
      '10-year parts warranty (select brands)',
    ],
    emergency: false,
  },
  {
    icon: '🚨',
    title: '24/7 Emergency Service',
    price: '$149 emergency call fee',
    desc: 'HVAC emergencies don\'t wait for business hours. Our emergency team is on call 24 hours a day, 7 days a week, 365 days a year — including holidays. We guarantee a technician at your door within 2 hours.',
    features: [
      '2-hour guaranteed response',
      'Available nights, weekends & holidays',
      '$149 emergency call fee (flat rate)',
      'Diagnostic fee waived if repair authorized',
      'Fully stocked trucks for immediate repairs',
      'Gas leak & carbon monoxide response',
      'Priority scheduling for Platinum members',
    ],
    emergency: true,
  },
  {
    icon: '💨',
    title: 'Indoor Air Quality',
    price: 'From $299',
    desc: 'Improve the air you breathe inside your home. Poor indoor air quality can cause allergies, respiratory issues, and discomfort. We offer a full range of IAQ solutions tailored to your home.',
    features: [
      'UV germicidal light systems',
      'Whole-home air purifiers (HEPA)',
      'Humidifiers & dehumidifiers',
      'Duct cleaning & sealing',
      'ERV/HRV fresh air systems',
      'Air quality testing & assessment',
      'Allergy-reducing filtration',
    ],
    emergency: false,
  },
  {
    icon: '🌡️',
    title: 'Smart Thermostats',
    price: 'From $150 installed',
    desc: 'Upgrade to a smart thermostat and take control of your comfort from anywhere. We install, configure, and connect smart thermostats to your HVAC system and smartphone.',
    features: [
      'Nest, Ecobee & Honeywell installation',
      'Full configuration & programming',
      'Smartphone app setup',
      'Zoning system integration',
      'Voice control setup (Alexa/Google)',
      'System compatibility check',
      'Energy savings analysis',
    ],
    emergency: false,
  },
  {
    icon: '🛡️',
    title: 'Maintenance Plans',
    price: 'From $149/year',
    desc: 'Preventive maintenance is the single best thing you can do for your HVAC system. Our maintenance plans keep your equipment running efficiently, extend its lifespan, and help you avoid unexpected breakdowns.',
    features: [
      'Annual or bi-annual tune-ups',
      'Priority emergency scheduling',
      'Parts & labor discounts',
      'Filter reminders & replacements',
      'No overtime charges',
      'Transferable to new homeowners',
      'Money-back guarantee',
    ],
    emergency: false,
  },
];

const PLANS = [
  {
    name: 'Silver',
    price: '$149',
    period: '/year',
    desc: 'Essential coverage for homeowners who want peace of mind.',
    features: [
      '1 annual tune-up (AC or Heating)',
      'Priority scheduling',
      '10% discount on parts',
      'Filter reminder service',
      'No overtime charges',
    ],
    popular: false,
  },
  {
    name: 'Gold',
    price: '$249',
    period: '/year',
    desc: 'Our most popular plan — covers both seasons.',
    features: [
      '2 annual tune-ups (AC + Heating)',
      'Priority scheduling',
      '15% discount on parts & labor',
      'Filter replacement included',
      'No overtime charges',
      'Free diagnostic visits',
    ],
    popular: true,
  },
  {
    name: 'Platinum',
    price: '$349',
    period: '/year',
    desc: 'Ultimate coverage with maximum savings.',
    features: [
      '2 annual tune-ups (AC + Heating)',
      'TOP priority emergency scheduling',
      '20% discount on parts & labor',
      'Filter replacements included',
      'No overtime or emergency fees',
      'Free diagnostic visits',
      'Annual duct inspection',
    ],
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="services-page">
      <div className="services-page__hero">
        <div className="container">
          <span className="badge">Full-Service HVAC</span>
          <h1>Our HVAC Services</h1>
          <p>
            Comprehensive heating and cooling services for Dallas-Fort Worth homeowners.
            Licensed, insured, and backed by our satisfaction guarantee.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/appointments" className="btn btn-orange">Schedule Service</Link>
            <a href="tel:5559114822" className="btn btn-outline-white">🚨 Emergency: (555) 911-HVAC</a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className={`service-detail-card${s.emergency ? ' emergency' : ''}`}>
              <div className="service-detail-card__header">
                <span className="service-detail-card__icon">{s.icon}</span>
                <div className="service-detail-card__title-group">
                  <h2 className="service-detail-card__title">{s.title}</h2>
                  <span className="service-detail-card__price">{s.price}</span>
                </div>
              </div>
              <p className="service-detail-card__desc">{s.desc}</p>
              <ul className="service-detail-card__features">
                {s.features.map((f) => (
                  <li key={f} className="service-detail-card__feature">{f}</li>
                ))}
              </ul>
              <div className="service-detail-card__actions">
                <Link to="/appointments" className="btn btn-primary">Book Now</Link>
                <a href="tel:5552345678" className="btn btn-outline">Call for Info</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Plans */}
      <section className="maintenance-plans">
        <div className="container">
          <div className="section-header">
            <span className="badge">Save Money</span>
            <h2 className="section-title">Maintenance Plan Comparison</h2>
            <p className="section-subtitle">
              Protect your investment with a ClimateRight maintenance plan. Members save an average of $400+ per year.
            </p>
          </div>
          <div className="plans-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`plan-card${plan.popular ? ' plan-card--popular' : ''}`}>
                {plan.popular && <span className="plan-card__badge">Most Popular</span>}
                <h3 className="plan-card__name">{plan.name}</h3>
                <div className="plan-card__price">
                  {plan.price}<span>{plan.period}</span>
                </div>
                <p className="plan-card__desc">{plan.desc}</p>
                <ul className="plan-card__features">
                  {plan.features.map((f) => (
                    <li key={f} className="plan-card__feature">{f}</li>
                  ))}
                </ul>
                <Link
                  to="/appointments"
                  className={`btn plan-card__btn ${plan.popular ? 'btn-orange' : 'btn-primary'}`}
                >
                  Sign Up for {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
