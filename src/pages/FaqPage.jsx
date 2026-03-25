import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FaqPage.css';

const FAQS = [
  {
    q: 'How often should I replace my AC filter?',
    a: `The frequency depends on the type of filter and your household conditions:

- **1-inch standard filters**: Replace every 1–3 months
- **4-inch media filters**: Replace every 6–12 months
- **HEPA filters**: Replace every 12 months
- **If you have pets**: Increase frequency by 30–50%
- **If anyone has allergies or asthma**: Check monthly, replace as needed

A dirty filter restricts airflow, makes your system work harder, reduces efficiency, and can cause the unit to freeze up. It's the #1 most important maintenance task you can do yourself. We recommend setting a monthly reminder to at least check your filter.`,
  },
  {
    q: 'Why is my AC blowing warm air?',
    a: `Several things can cause warm air — here's what to check first:

1. **Thermostat**: Make sure it's set to "COOL" mode and the temperature is below the current room temperature. Also check the batteries.
2. **Air filter**: A severely clogged filter can cause the system to overheat and blow warm air. Replace it if it's dirty.
3. **Circuit breaker**: Sometimes only the air handler (inside unit) is running, but the compressor (outside unit) has tripped. Check your breaker panel.
4. **Frozen coil**: If the outdoor unit is covered in ice, turn the system off and run the fan only to defrost for an hour.

If none of these fix it, the likely causes include low refrigerant, a failed capacitor, dirty condenser coils, or a failing compressor. These require a professional technician. Call us at (555) 234-5678 for same-day diagnostics.`,
  },
  {
    q: 'What size HVAC system do I need?',
    a: `HVAC sizing is not one-size-fits-all — and an incorrectly sized system (too big or too small) will cause problems including short cycling, humidity issues, and early failure.

The proper method is a "Manual J" load calculation, which takes into account:
- Square footage of your home
- Ceiling height and number of floors
- Insulation quality and R-values
- Window size, type, and orientation
- Local climate (Dallas has high cooling loads)
- Number of occupants
- Ductwork condition and layout

As a rough guide for Dallas, you typically need about 1 ton of cooling per 400–600 sq ft, but this varies considerably. Our technicians perform a full Manual J calculation on every new installation — free of charge. Call us to schedule your free estimate.`,
  },
  {
    q: 'How long does an AC unit last?',
    a: `In the Dallas area's hot climate, here are typical lifespans:

- **Central AC system**: 12–17 years with regular maintenance
- **Heat pump**: 15–20 years
- **Gas furnace**: 18–25 years
- **Air handler**: 15–20 years

Factors that significantly affect lifespan include:
- Regular maintenance (systems maintained annually last 25–40% longer)
- Quality of the original installation
- Filter change frequency
- Oversizing or undersizing
- Local climate (Dallas heat is hard on equipment)

If your system is over 12 years old and requiring frequent repairs, it's often more economical to replace it than to continue repairing it. We can run a repair vs. replace analysis for you at no charge.`,
  },
  {
    q: "What's included in a tune-up?",
    a: `Our comprehensive tune-up includes a full 20-point inspection and service:

**AC Tune-Up includes:**
- Inspect and clean condenser and evaporator coils
- Check refrigerant levels and inspect for leaks
- Test and tighten all electrical connections
- Inspect capacitors, contactors, and relays
- Lubricate all moving parts
- Check and clear condensate drain line
- Inspect ductwork for visible leaks
- Test thermostat calibration
- Check airflow and static pressure
- Clean or replace air filter (1" standard)
- Full system performance report

**Heating Tune-Up additionally includes:**
- Inspect heat exchanger for cracks (safety critical)
- Test gas pressure and burner operation
- Clean burners and ignition system
- Test safety controls and limit switches
- Inspect flue and venting

Our one-time tune-up is $129. Maintenance plan members receive discounted or included tune-ups.`,
  },
  {
    q: 'Do you offer emergency service on weekends?',
    a: `Yes — absolutely. ClimateRight offers true 24/7 emergency service, including weekends, holidays, and overnight. There is no extra charge for weekend or nighttime emergency calls beyond our standard $149 emergency call fee.

Here's how our emergency service works:
- Call (555) 911-HVAC any time, day or night
- We'll dispatch a technician within 2 hours (guaranteed)
- The $149 emergency call fee covers the dispatch and diagnosis
- The diagnostic fee is waived if you authorize the repair
- Our trucks are fully stocked so most repairs are completed on the first visit
- Platinum maintenance plan members receive free emergency dispatches

For life-threatening emergencies (gas smell, carbon monoxide alarm, fire), please call 911 first, then call us.`,
  },
  {
    q: 'What brands do you service?',
    a: `We service all major HVAC brands, including but not limited to:

**Cooling brands**: Carrier, Trane, Lennox, Rheem, Ruud, Goodman, Amana, York, Daikin, Mitsubishi, LG, Samsung

**Heating brands**: Carrier, Lennox, Trane, Rheem, Ruud, Goodman, American Standard, Bryant, Heil, Nordyne

**Thermostat brands**: Nest, Ecobee, Honeywell, Emerson, White-Rodgers, Sensi

For new installations, we are authorized dealers for Carrier, Lennox, and Trane, which allows us to offer manufacturer warranties and best pricing. If you have a brand not listed here, call us — chances are we service it.`,
  },
  {
    q: 'How much does a new AC system cost?',
    a: `New AC system cost in the Dallas area depends on several factors:

**Typical cost ranges:**
- Basic system (13–15 SEER2): $3,500 – $5,500 installed
- Mid-efficiency system (16–18 SEER2): $5,500 – $8,000 installed
- High-efficiency system (19+ SEER2): $8,000 – $12,000+ installed
- Ductless mini-split (single zone): $2,500 – $4,500

**What affects price:**
- System size (tonnage) — bigger homes need larger equipment
- Efficiency rating — higher SEER = higher upfront cost, lower energy bills
- Brand and equipment quality
- Ductwork modifications needed
- Permit and inspection fees
- Installation complexity

We provide free, no-obligation estimates. All estimates include equipment, labor, permits, and startup. We also offer 0% financing for 18 months on qualifying systems.`,
  },
  {
    q: 'Should I repair or replace my old unit?',
    a: `A good rule of thumb is the **5,000 rule**: multiply the repair cost by the age of the system. If the result exceeds $5,000, replacement is usually the smarter investment.

**Consider replacement when:**
- The system is over 12 years old
- Repair cost exceeds 50% of a new system cost
- R-22 refrigerant is required (it's discontinued and very expensive)
- You're dealing with repeated breakdowns
- Your energy bills have been climbing significantly
- The system uses R-22 (phased out) refrigerant
- Comfort is inconsistent throughout your home

**Consider repair when:**
- The system is under 8 years old
- The repair is minor (capacitor, contactor, minor refrigerant)
- You plan to move within 2–3 years

We can provide an honest repair vs. replace analysis and never push unnecessary replacements. Our goal is your long-term value, not a quick sale.`,
  },
  {
    q: "What's covered under warranty?",
    a: `Warranty coverage depends on the type of work and equipment:

**Equipment Warranty (New Installs):**
- Most major brands offer 5–10 year parts warranties
- Premium brands (Carrier, Lennox, Trane) offer 10-year parts when registered within 90 days
- Some systems include 10-year compressor warranties
- We handle manufacturer registration for you

**Labor Warranty:**
- ClimateRight provides a 1-year labor warranty on all new installations
- 90-day labor warranty on all repairs

**Maintenance Plan Benefits:**
- Platinum plan members receive extended labor warranty coverage
- Parts discounts of 15–20% not covered by manufacturer warranty

**What's NOT covered:**
- Normal wear and maintenance items (filters, belts, etc.)
- Damage caused by homeowner neglect or improper maintenance
- Acts of nature, power surges (we recommend surge protection)

If you have questions about your specific equipment's warranty, call us at (555) 234-5678 and we'll look it up for you.`,
  },
];

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-question__text">{q}</span>
        <span className="faq-question__icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
        <div className="faq-answer__inner">
          {a.split('\n').filter(Boolean).map((para, i) => {
            if (para.startsWith('- ') || para.startsWith('**')) {
              return <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^- /, '• ') }} />;
            }
            return <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="container">
          <span className="badge">Have Questions?</span>
          <h1>Frequently Asked Questions</h1>
          <p>
            Get answers to the most common HVAC questions from our team of certified technicians.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="faq-layout">
          {/* FAQ List */}
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="faq-sidebar">
            <div className="faq-sidebar__card">
              <h3>Still Have Questions?</h3>
              <p>
                Can't find your answer here? Our HVAC experts are happy to help.
                Call or message us anytime.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                Contact Us
              </Link>
              <a href="tel:5552345678" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                📞 (555) 234-5678
              </a>
            </div>

            <div className="faq-sidebar__card">
              <h3>Book a Service</h3>
              <p>Ready to schedule? Our team is available Mon–Fri 7AM–7PM and Sat 8AM–5PM.</p>
              <Link to="/appointments" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                Schedule Now →
              </Link>
            </div>

            <div className="faq-emergency-card">
              <h3>🚨 HVAC Emergency?</h3>
              <p>No heat, no AC, gas smell? Call our 24/7 emergency line.</p>
              <a href="tel:5559114822">(555) 911-HVAC</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
