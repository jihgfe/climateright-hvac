import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FinancingPage.css';

const PLANS_DATA = [
  {
    id: 'good',
    tier: 'Option 1',
    name: 'Good',
    headline: '0% Interest for 12 Months',
    badge: null,
    features: [
      { label: '0% APR for 12 months' },
      { label: '$0 down payment required' },
      { label: 'Minimum system cost: $500' },
      { label: 'Flexible monthly payments' },
      { label: 'No prepayment penalty' },
    ],
    months: 12,
    apr: 0,
    best: false,
  },
  {
    id: 'better',
    tier: 'Option 2',
    name: 'Better',
    headline: '0% Interest for 18 Months',
    badge: 'Most Popular',
    features: [
      { label: '0% APR for 18 months' },
      { label: '$0 down payment required' },
      { label: 'Minimum system cost: $2,000' },
      { label: 'Flexible monthly payments' },
      { label: 'No prepayment penalty' },
      { label: 'Covers most new installations' },
    ],
    months: 18,
    apr: 0,
    best: true,
  },
  {
    id: 'best',
    tier: 'Option 3',
    name: 'Best',
    headline: 'Low APR for 84 Months',
    badge: null,
    features: [
      { label: 'Low fixed APR (7.99%)' },
      { label: '$0 down payment required' },
      { label: 'Minimum system cost: $3,000' },
      { label: 'Up to 84 months (7 years)' },
      { label: 'Lowest possible monthly payment' },
      { label: 'Ideal for premium system installs' },
    ],
    months: 84,
    apr: 7.99,
    best: false,
  },
];

function calcPayment(amount, months, apr) {
  if (!amount || amount <= 0) return 0;
  if (apr === 0) {
    return amount / months;
  }
  const r = apr / 100 / 12;
  return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function FinancingPage() {
  const [cost, setCost] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('better');

  const plan = PLANS_DATA.find((p) => p.id === selectedPlan);
  const payment = plan && cost ? calcPayment(parseFloat(cost), plan.months, plan.apr) : 0;

  return (
    <div className="financing-page">
      <div className="financing-hero">
        <div className="container">
          <span className="badge">Flexible Financing</span>
          <h1>
            <span className="financing-hero__highlight">0% Financing</span> for 18 Months<br />
            on Qualifying Systems
          </h1>
          <p>
            Get the heating and cooling system your home deserves — with payment plans
            designed to fit any budget. Apply in minutes, get instant decision.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/appointments" className="btn btn-orange">Apply & Schedule Today</Link>
            <a href="tel:5552345678" className="btn btn-outline-white">📞 Talk to Us First</a>
          </div>
        </div>
      </div>

      {/* Financing Plans */}
      <section className="financing-plans">
        <div className="container">
          <div className="section-header">
            <span className="badge">Financing Plans</span>
            <h2 className="section-title">Choose Your Payment Plan</h2>
            <p className="section-subtitle">
              All plans require no down payment and no prepayment penalties.
              Subject to credit approval.
            </p>
          </div>
          <div className="financing-plans__grid">
            {PLANS_DATA.map((plan) => (
              <div key={plan.id} className={`financing-card${plan.best ? ' financing-card--best' : ''}`}>
                {plan.badge && <span className="financing-card__badge">{plan.badge}</span>}
                <p className="financing-card__tier">{plan.tier}</p>
                <h3 className="financing-card__name">{plan.name}</h3>
                <p className="financing-card__headline">{plan.headline}</p>
                <ul className="financing-card__features">
                  {plan.features.map((f) => (
                    <li key={f.label} className="financing-card__feature">
                      <span className="check">✓</span>
                      {f.label}
                    </li>
                  ))}
                </ul>
                <Link to="/appointments" className={`btn financing-card__btn ${plan.best ? 'btn-orange' : 'btn-primary'}`}>
                  Apply for {plan.name} Plan
                </Link>
              </div>
            ))}
          </div>

          <div style={{
            background: 'var(--blue-light)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-6)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-4)',
            textAlign: 'center',
          }}>
            {[
              ['💳', 'No Down Payment', 'Start service with $0 out of pocket.'],
              ['⚡', 'Instant Decision', 'Get approved in minutes online or over the phone.'],
              ['🔒', 'Secure Application', 'Bank-level security for all applications.'],
              ['🏡', 'All Credit Levels', 'Multiple options to fit your credit profile.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ padding: 'var(--space-3)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Estimator */}
      <section className="financing-estimator">
        <div className="container">
          <div className="section-header">
            <span className="badge">Payment Estimator</span>
            <h2 className="section-title">Estimate Your Monthly Payment</h2>
            <p className="section-subtitle">
              Enter your estimated system cost and choose a plan to see your estimated monthly payment.
            </p>
          </div>
          <div className="estimator-card">
            <h3>🧮 Payment Calculator</h3>
            <div className="form-group">
              <label className="form-label">Estimated System Cost ($)</label>
              <input
                type="number"
                className="form-input"
                min="500"
                max="50000"
                step="100"
                placeholder="e.g. 5000"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Select Financing Plan</label>
              <div className="plan-selector">
                {PLANS_DATA.map((p) => (
                  <div key={p.id} className="plan-option">
                    <input
                      type="radio"
                      id={`plan-${p.id}`}
                      name="planSelect"
                      value={p.id}
                      checked={selectedPlan === p.id}
                      onChange={() => setSelectedPlan(p.id)}
                    />
                    <label htmlFor={`plan-${p.id}`}>
                      {p.name}<br />
                      <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>
                        {p.apr === 0 ? `0% / ${p.months} mo` : `${p.apr}% / ${p.months} mo`}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {payment > 0 && (
              <div className="estimator__result">
                <div className="estimator__monthly">
                  ${payment.toFixed(2)}<span>/mo</span>
                </div>
                <div className="estimator__plan-info">
                  Estimated for {plan.name} plan · {plan.months} months ·{' '}
                  {plan.apr === 0 ? '0% APR' : `${plan.apr}% APR`}
                  <br />
                  <small style={{ color: 'var(--gray-400)' }}>
                    *Estimate only. Subject to credit approval. Actual payments may vary.
                  </small>
                </div>
              </div>
            )}
            {!payment && cost && (
              <div className="estimator__result">
                <p style={{ color: 'var(--red)', fontSize: '0.875rem' }}>
                  Please enter a valid cost amount above the plan minimum.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="financing-cta">
        <div className="container">
          <div className="financing-cta__inner">
            <h2>Apply in Minutes — Get Comfortable Today</h2>
            <p>
              Don't let budget concerns delay your comfort. Our financing team can help you find the right plan and get your service scheduled same-day.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/appointments" className="btn btn-orange">Start Your Application</Link>
              <a href="tel:5552345678" className="btn btn-outline-white">📞 (555) 234-5678</a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="financing-disclaimer">
        <div className="container">
          <p>
            *Financing is subject to credit approval. Not all applicants will qualify for promotional rates.
            Promotional APR of 0% requires equal monthly payments during the promotional period.
            Balance remaining after the promotional period is subject to standard APR.
            Minimum purchase amounts apply as noted. ClimateRight HVAC is not a lender;
            financing is arranged through third-party financial institutions.
            See your financing agreement for full terms and conditions.
            TX License #TX-HVAC-2847.
          </p>
        </div>
      </section>
    </div>
  );
}
