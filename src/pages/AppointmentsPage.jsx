import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './AppointmentsPage.css';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SERVICE_TYPES = [
  'AC Repair',
  'AC Installation',
  'Heating Repair',
  'Heating Installation',
  'Maintenance Tune-Up',
  'Emergency Service',
  'Indoor Air Quality',
  'Smart Thermostat',
  'Other',
];

const TIME_SLOTS = [
  { id: '7-9', label: '7–9 AM' },
  { id: '9-11', label: '9–11 AM' },
  { id: '11-1', label: '11 AM–1 PM' },
  { id: '1-3', label: '1–3 PM' },
  { id: '3-5', label: '3–5 PM' },
  { id: '5-7', label: '5–7 PM' },
];

const today = new Date().toISOString().split('T')[0];

const INITIAL = {
  serviceType: '',
  date: '',
  timeSlot: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  notes: '',
};

export default function AppointmentsPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState(() => {
    // Pre-fill from hero booking card if user came from homepage
    try {
      const saved = sessionStorage.getItem('heroBooking');
      if (saved) {
        const data = JSON.parse(saved);
        sessionStorage.removeItem('heroBooking');
        const nameParts = (data.name || '').trim().split(' ');
        return {
          ...INITIAL,
          serviceType: data.service || '',
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          phone: data.phone || '',
          city: data.city || '',
        };
      }
    } catch (_) {}
    return INITIAL;
  });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.serviceType) e.serviceType = 'Please select a service type.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.date) e.date = 'Please select a date.';
    if (!form.timeSlot) e.timeSlot = 'Please select a time slot.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.address.trim()) e.address = 'Address is required.';
    if (!form.city.trim()) e.city = 'City is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) { setStep(2); return; }
    if (step === 2 && validateStep2()) { setStep(3); return; }
    if (step === 3 && validateStep3()) {
      setSubmitting(true);
      setSubmitError('');
      const timeLabel = TIME_SLOTS.find((s) => s.id === form.timeSlot)?.label ?? form.timeSlot;
      const dateLabel = new Date(form.date + 'T12:00').toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
      const bookingRef = 'CR-' + Date.now().toString(36).toUpperCase();
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            booking_ref:      bookingRef,
            customer_name:    `${form.firstName} ${form.lastName}`,
            customer_email:   form.email,
            customer_phone:   form.phone,
            service_type:     form.serviceType,
            preferred_date:   dateLabel,
            preferred_time:   timeLabel,
            service_address:  `${form.address}, ${form.city}`,
            notes:            form.notes || 'None',
          },
          EMAILJS_PUBLIC_KEY,
        );
      } catch (err) {
        console.error('EmailJS error:', err);
        const msg = err?.text || err?.message || JSON.stringify(err);
        setSubmitError(`Email notification failed (${msg}). We still received your request.`);
      } finally {
        setSubmitting(false);
        setStep(4);
      }
    }
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const STEPS = [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Date & Time' },
    { n: 3, label: 'Contact Info' },
  ];

  return (
    <div className="appointments-page">
      <div className="appointments-hero">
        <div className="container">
          <span className="badge">Easy Booking</span>
          <h1>Schedule Your HVAC Service</h1>
          <p>Book online in minutes. We'll call to confirm within 1 hour.</p>
        </div>
      </div>

      <div className="container">
        <div className="appointments-layout">
          {/* Booking form */}
          <div className="booking-card">
            {step < 4 && (
              <div className="booking-progress">
                {STEPS.map((s, i) => (
                  <>
                    <div key={s.n} className="booking-progress__step">
                      <div
                        className={`booking-progress__dot${step === s.n ? ' booking-progress__dot--active' : ''}${step > s.n ? ' booking-progress__dot--done' : ''}`}
                      >
                        {step > s.n ? '✓' : s.n}
                      </div>
                      <span
                        className={`booking-progress__label${step === s.n ? ' booking-progress__label--active' : ''}${step > s.n ? ' booking-progress__label--done' : ''}`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div key={`line-${s.n}`} className={`booking-progress__line${step > s.n ? ' booking-progress__line--done' : ''}`} />
                    )}
                  </>
                ))}
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="booking-step">
                <h2>What service do you need?</h2>
                <div className="form-group">
                  <label className="form-label">Service Type <span>*</span></label>
                  <select
                    className={`form-select${errors.serviceType ? ' error' : ''}`}
                    value={form.serviceType}
                    onChange={(e) => update('serviceType', e.target.value)}
                  >
                    <option value="">Select a service...</option>
                    {SERVICE_TYPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.serviceType && <p className="form-error">{errors.serviceType}</p>}
                </div>
                {form.serviceType === 'Emergency Service' && (
                  <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 'var(--radius)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <p style={{ color: 'var(--red)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                      🚨 For immediate emergencies, call us now!
                    </p>
                    <a href="tel:5559114822" style={{ color: 'var(--red)', fontWeight: 700 }}>(555) 911-HVAC</a>
                    <p style={{ fontSize: '0.82rem', color: 'var(--gray-600)', marginTop: '4px' }}>
                      For emergency scheduling, you can also continue with this form.
                    </p>
                  </div>
                )}
                <div className="step-actions">
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next: Choose Date &amp; Time →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="booking-step">
                <h2>When would you like service?</h2>
                <div className="form-group">
                  <label className="form-label">Preferred Date <span>*</span></label>
                  <input
                    type="date"
                    className={`form-input${errors.date ? ' error' : ''}`}
                    min={today}
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                  />
                  {errors.date && <p className="form-error">{errors.date}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time Slot <span>*</span></label>
                  <div className="time-slots">
                    {TIME_SLOTS.map((slot) => (
                      <div key={slot.id} className="time-slot">
                        <input
                          type="radio"
                          id={`slot-${slot.id}`}
                          name="timeSlot"
                          value={slot.id}
                          checked={form.timeSlot === slot.id}
                          onChange={() => update('timeSlot', slot.id)}
                        />
                        <label htmlFor={`slot-${slot.id}`}>{slot.label}</label>
                      </div>
                    ))}
                  </div>
                  {errors.timeSlot && <p className="form-error">{errors.timeSlot}</p>}
                </div>
                <div className="step-actions">
                  <button className="btn btn-outline" onClick={handleBack}>← Back</button>
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next: Your Info →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="booking-step">
                <h2>Your contact information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name <span>*</span></label>
                    <input
                      type="text"
                      className={`form-input${errors.firstName ? ' error' : ''}`}
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="form-error">{errors.firstName}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name <span>*</span></label>
                    <input
                      type="text"
                      className={`form-input${errors.lastName ? ' error' : ''}`}
                      value={form.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                      placeholder="Smith"
                    />
                    {errors.lastName && <p className="form-error">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone <span>*</span></label>
                    <input
                      type="tel"
                      className={`form-input${errors.phone ? ' error' : ''}`}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="(555) 000-0000"
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email <span>*</span></label>
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
                <div className="form-group">
                  <label className="form-label">Service Address <span>*</span></label>
                  <input
                    type="text"
                    className={`form-input${errors.address ? ' error' : ''}`}
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="123 Main Street"
                  />
                  {errors.address && <p className="form-error">{errors.address}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">City <span>*</span></label>
                  <input
                    type="text"
                    className={`form-input${errors.city ? ' error' : ''}`}
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="Dallas"
                  />
                  {errors.city && <p className="form-error">{errors.city}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Special Notes / Problem Description</label>
                  <textarea
                    className="form-textarea"
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Describe your issue or any special instructions for our technician..."
                  />
                </div>
                <div className="step-actions">
                  <button className="btn btn-outline" onClick={handleBack} disabled={submitting}>← Back</button>
                  <button className="btn btn-orange" onClick={handleNext} disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Confirm Booking ✓'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="booking-confirmation">
                <div className="booking-confirmation__icon">🎉</div>
                <h2>Booking Request Received!</h2>
                <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-4)' }}>
                  Thank you, {form.firstName}! Your service request has been submitted successfully.
                </p>
                {submitError && (
                  <p style={{ color: 'var(--red)', fontSize: '0.85rem', marginBottom: 'var(--space-4)' }}>
                    ⚠️ {submitError}
                  </p>
                )}
                <div className="booking-confirmation__summary">
                  <h3>Booking Summary</h3>
                  <div className="booking-confirmation__row">
                    <span>Service</span>
                    <span>{form.serviceType}</span>
                  </div>
                  <div className="booking-confirmation__row">
                    <span>Date</span>
                    <span>{new Date(form.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="booking-confirmation__row">
                    <span>Time</span>
                    <span>{TIME_SLOTS.find((s) => s.id === form.timeSlot)?.label}</span>
                  </div>
                  <div className="booking-confirmation__row">
                    <span>Name</span>
                    <span>{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="booking-confirmation__row">
                    <span>Phone</span>
                    <span>{form.phone}</span>
                  </div>
                  <div className="booking-confirmation__row">
                    <span>Address</span>
                    <span>{form.address}, {form.city}</span>
                  </div>
                </div>
                <div className="booking-confirmation__note">
                  📞 A ClimateRight team member will call <strong>{form.phone}</strong> within 1 hour to confirm your appointment. Please have your HVAC system info ready if possible.
                </div>
                <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="tel:5552345678" className="btn btn-primary">📞 Call Us Instead</a>
                  <button className="btn btn-outline" onClick={() => { setForm(INITIAL); setStep(1); }}>
                    Book Another Service
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="booking-sidebar">
            <div className="sidebar-card">
              <h3>Why Book With Us</h3>
              <div className="sidebar-why">
                {[
                  ['✓', 'Confirmed within 1 hour'],
                  ['⏰', 'Same-day service available'],
                  ['💰', 'Upfront pricing, no surprises'],
                  ['🏆', 'NATE-certified technicians'],
                  ['🛡️', '100% satisfaction guarantee'],
                  ['💳', 'Financing available'],
                ].map(([icon, text]) => (
                  <div key={text} className="sidebar-why__item">
                    <span className="icon">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Contact Us Directly</h3>
              <div>
                {[
                  { icon: '📞', label: 'Main Line', value: <a href="tel:5552345678">(555) 234-5678</a> },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Fri 7AM–7PM, Sat 8AM–5PM' },
                  { icon: '📍', label: 'Address', value: '4821 Industrial Pkwy, Dallas TX' },
                  { icon: '✉️', label: 'Email', value: <a href="mailto:info@climaterighthvac.com">info@climateright...</a> },
                ].map((item) => (
                  <div key={item.label} className="sidebar-contact__item">
                    <span className="icon">{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="emergency-sidebar">
              <h4>🚨 HVAC Emergency?</h4>
              <p>Don't wait — call our 24/7 emergency line right now.</p>
              <a href="tel:5559114822">(555) 911-HVAC</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
