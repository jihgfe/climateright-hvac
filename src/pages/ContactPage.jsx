import { useState } from 'react';
import './ContactPage.css';

const SERVICE_TYPES = [
  'AC Repair',
  'AC Installation',
  'Heating Repair',
  'Heating Installation',
  'Maintenance Tune-Up',
  'Emergency Service',
  'Indoor Air Quality',
  'Smart Thermostat',
  'Billing / Account',
  'General Question',
  'Other',
];

const INIT = { name: '', email: '', phone: '', serviceType: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (f, v) => {
    setForm((p) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Please enter your message.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="badge">Get in Touch</span>
          <h1>Contact ClimateRight HVAC</h1>
          <p>
            Have a question or need a quote? We'd love to hear from you.
            Expect a response within 1 business hour.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          {/* Form */}
          <div className="contact-form-card">
            {!submitted ? (
              <>
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Full Name <span style={{ color: 'var(--red)' }}>*</span></label>
                      <input
                        type="text"
                        className={`form-input${errors.name ? ' error' : ''}`}
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="John Smith"
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email <span style={{ color: 'var(--red)' }}>*</span></label>
                      <input
                        type="email"
                        className={`form-input${errors.email ? ' error' : ''}`}
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="john@email.com"
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Service Type</label>
                      <select
                        className="form-select"
                        value={form.serviceType}
                        onChange={(e) => update('serviceType', e.target.value)}
                      >
                        <option value="">Select (optional)...</option>
                        {SERVICE_TYPES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label">Message <span style={{ color: 'var(--red)' }}>*</span></label>
                    <textarea
                      className={`form-textarea${errors.message ? ' error' : ''}`}
                      style={{ minHeight: '140px' }}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us about your HVAC issue, question, or what you need..."
                    />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem' }}>
                    Send Message →
                  </button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--gray-400)', textAlign: 'center', marginTop: 'var(--space-3)' }}>
                    We respond within 1 business hour. For emergencies, call (555) 911-HVAC.
                  </p>
                </form>
              </>
            ) : (
              <div className="contact-success">
                <div className="contact-success__icon">✅</div>
                <h3>Message Sent!</h3>
                <p>
                  Thanks, {form.name}! We've received your message and will respond to{' '}
                  <strong>{form.email}</strong> within 1 business hour.
                </p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: 'var(--space-5)' }}
                  onClick={() => { setForm(INIT); setSubmitted(false); }}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <aside className="contact-info">
            {[
              {
                icon: '📍',
                label: 'Our Address',
                value: <>4821 Industrial Pkwy, Suite 100<br />Dallas, TX 75201</>,
              },
              {
                icon: '📞',
                label: 'Phone',
                value: (
                  <>
                    <a href="tel:5552345678">(555) 234-5678</a>
                    <br />
                    Emergency: <a href="tel:5559114822">(555) 911-HVAC</a>
                  </>
                ),
              },
              {
                icon: '✉️',
                label: 'Email',
                value: <a href="mailto:info@climaterighthvac.com">info@climaterighthvac.com</a>,
              },
              {
                icon: '🕐',
                label: 'Business Hours',
                value: (
                  <>
                    Mon–Fri: 7AM–7PM<br />
                    Saturday: 8AM–5PM<br />
                    Sunday: Emergency Only
                  </>
                ),
              },
              {
                icon: '🏢',
                label: 'License & Credentials',
                value: (
                  <>
                    TX License #TX-HVAC-2847<br />
                    BBB A+ Accredited<br />
                    NATE Certified · EPA 608
                  </>
                ),
              },
            ].map((item) => (
              <div key={item.label} className="contact-info-card">
                <span className="contact-info-card__icon">{item.icon}</span>
                <div>
                  <div className="contact-info-card__label">{item.label}</div>
                  <div className="contact-info-card__value">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="contact-map">
              <div className="contact-map__placeholder">
                <div style={{ fontSize: '2rem' }}>🗺️</div>
                <strong style={{ color: 'var(--gray-700)', display: 'block', marginTop: '8px' }}>
                  4821 Industrial Pkwy, Dallas TX
                </strong>
                <p>Located in the Industrial District near I-35</p>
                <a
                  href="https://maps.google.com/?q=4821+Industrial+Pkwy+Dallas+TX+75201"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            <div className="emergency-contact-card">
              <h3>🚨 HVAC Emergency?</h3>
              <p>Available 24/7, 365 days a year. 2-hour response guaranteed.</p>
              <a href="tel:5559114822">(555) 911-HVAC</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
