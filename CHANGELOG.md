# ClimateRight HVAC — Changelog

---

## v1.2.0 — 2026-03-25
### Booking Form — EmailJS Integration
- Booking form submissions now send an email notification to `slerf38@gmail.com`
- Email includes full booking details: customer name, phone, email, service type, date, time, address, and notes
- Each submission generates a unique booking reference (e.g. `CR-M8X2JF`)
- "Confirm Booking" button shows a loading state while the email sends
- Fails gracefully — user still reaches confirmation screen even if email send fails
- EmailJS credentials stored as Vercel environment variables (never committed to git)

---

## v1.1.0 — 2026-03-25
### CRO (Conversion Rate Optimization) Improvements

#### Hero Section
- Hero booking card is now fully controlled — form data (service, name, phone, city) is saved to sessionStorage when user clicks "Book My Appointment"
- Appointments page reads sessionStorage on load and pre-fills matching fields, so users don't have to start over
- Added green pulsing urgency badge: "Same-Day Slots Available Today"
- Updated hero badge to include seasonal messaging: "Now Booking Spring Tune-Ups"

#### Promo Strip
- Added a promotional banner between the hero and stats bar
- Spring Special: "$69 AC Tune-Up (Save $30) · Limited slots available this week"
- Links directly to the Appointments page

#### Stats Bar
- All four stats now animate on scroll (count up from 0 when the section enters the viewport)
- Google review count added: "4.9★ (2,400+) Google Reviews"

#### Trust Badges Strip
- New section added below the stats bar with 5 trust credentials:
  BBB A+ Rating · NATE Certified · TX Licensed (#TX-HVAC-2847) · EPA 608 · Fully Insured

#### Testimonials
- Replaced generic 👤 emoji avatars with colored initials circles (SM, RT, JL)
- Added a footer row below testimonials showing "⭐ Based on 2,400+ verified Google & Yelp reviews"
- Added a "Join Our Happy Customers →" CTA button

#### Service Cards
- Each service card now links to a specific anchor section on the Services page
  (e.g. `/services#emergency`, `/services#maintenance`) instead of all linking to the same page

#### Mobile Experience
- Added sticky bottom call bar on mobile (≤768px): "📞 Call Now" + "📅 Book Service"
- Chatbot widget repositioned above the mobile call bar on small screens

#### Chatbot (Aria)
- Added proactive engagement bubble after 8 seconds of inactivity: "👋 Need help choosing a service? Ask Aria!"
- Bubble is dismissible and only shows once per session (sessionStorage flag)
- Clicking the bubble opens the chat window

#### Back-to-Top Button
- Floating back-to-top button appears after scrolling 400px
- Smooth scrolls to top on click
- Positioned above the chatbot widget on desktop, above the mobile call bar on mobile

---

## v1.0.0 — 2026-03-25
### Initial Release

#### Pages
- **Home** — Hero with inline booking card, stats bar, services preview, why choose, testimonials, service areas, CTA banner
- **Services** — Full breakdown of all HVAC services offered
- **About** — Company story, team, and values
- **Appointments** — 3-step booking wizard (Service → Date & Time → Contact Info → Confirmation)
- **Financing** — 0% interest financing options and plan details
- **FAQ** — Accordion-style frequently asked questions
- **Contact** — Contact form, map placeholder, business hours, and direct contact info

#### Components
- **Navbar** — Sticky with scroll shadow, active link highlighting, phone number, 24/7 Emergency button, mobile hamburger drawer
- **Emergency Bar** — Dismissible red top bar for after-hours emergency calls (persists via sessionStorage)
- **Footer** — 4-column layout with links, services, contact info, social icons, and license/certification info
- **Aria Chatbot** — Floating chat widget powered by OpenRouter (xiaomi/mimo-v2-pro) with a comprehensive HVAC system prompt, unread badge, and pulse animation

#### Technical
- Built with Vite + React + React Router DOM
- Fully responsive — desktop and mobile
- Deployed to Vercel with SPA rewrite rules
- OpenRouter API key stored as Vercel environment variable
- Git repository initialized and pushed to GitHub (`jihgfe/climateright-hvac`)
