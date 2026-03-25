import { Link } from 'react-router-dom';
import './Footer.css';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function YelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.177-1.63l2.938-4.431a1.26 1.26 0 0 1 1.92-.186c.96.895 2.058 2.63 1.514 4.445a1.07 1.07 0 0 1-.2.37zM13.27 11.05l1.44-5.123a1.27 1.27 0 0 0-.85-1.57C12.18 3.91 9.7 3.83 8.46 4.755a1.27 1.27 0 0 0-.32 1.83l3.18 4.32c.6.82 1.77.6 1.95-.85zM11.27 14.34l-5.01-1.55a1.27 1.27 0 0 0-1.57.89c-.4 1.55-.2 3.9 1 4.87a1.27 1.27 0 0 0 1.83-.32l3.18-4.32c-.32-.49-.15-.47.57-.57zm1.8 1.15l-1.44 5.12a1.27 1.27 0 0 0 .85 1.57c1.68.45 4.17.53 5.41-.4a1.27 1.27 0 0 0 .32-1.83l-3.18-4.32a1.1 1.1 0 0 0-1.96-.14zm-3.2-2.4l-5.04 1.56a1.27 1.27 0 0 0-.85 1.57c.4 1.55 1.88 3.57 3.37 3.89a1.27 1.27 0 0 0 1.48-1.05l.76-5.33c.14-.96-.94-1.58-1.72-1.64z"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">❄️</span>
              <span className="footer__logo-text">
                <span className="footer__logo-name">ClimateRight</span>
                <span className="footer__logo-sub">HVAC</span>
              </span>
            </Link>
            <p className="footer__tagline">"Comfort You Can Count On"</p>
            <p className="footer__desc">
              Serving the Dallas-Fort Worth Metroplex since 2003. Family-owned, NATE certified,
              and committed to keeping your home comfortable year-round.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" className="footer__social-link" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" className="footer__social-link" aria-label="Google"><GoogleIcon /></a>
              <a href="#" className="footer__social-link" aria-label="Yelp"><YelpIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/services" className="footer__link">Services</Link></li>
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/appointments" className="footer__link">Book Appointment</Link></li>
              <li><Link to="/financing" className="footer__link">Financing</Link></li>
              <li><Link to="/faq" className="footer__link">FAQ</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              <li><Link to="/services" className="footer__link">AC Repair</Link></li>
              <li><Link to="/services" className="footer__link">AC Installation</Link></li>
              <li><Link to="/services" className="footer__link">Heating Repair</Link></li>
              <li><Link to="/services" className="footer__link">Heating Installation</Link></li>
              <li><Link to="/services" className="footer__link">Emergency Service</Link></li>
              <li><Link to="/services" className="footer__link">Maintenance Plans</Link></li>
              <li><Link to="/services" className="footer__link">Indoor Air Quality</Link></li>
              <li><Link to="/services" className="footer__link">Smart Thermostats</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact-items">
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <div>
                  <span className="footer__contact-label">Address</span>
                  <span className="footer__contact-value">
                    4821 Industrial Pkwy, Suite 100<br />
                    Dallas, TX 75201
                  </span>
                </div>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                <div>
                  <span className="footer__contact-label">Phone</span>
                  <span className="footer__contact-value">
                    <a href="tel:5552345678">(555) 234-5678</a><br />
                    <a href="tel:5559114822">Emergency: (555) 911-HVAC</a>
                  </span>
                </div>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">🕐</span>
                <div>
                  <span className="footer__contact-label">Hours</span>
                  <span className="footer__contact-value">
                    Mon–Fri: 7AM–7PM<br />
                    Sat: 8AM–5PM<br />
                    Sun: Emergency Only
                  </span>
                </div>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">✉️</span>
                <div>
                  <span className="footer__contact-label">Email</span>
                  <span className="footer__contact-value">
                    <a href="mailto:info@climaterighthvac.com">info@climaterighthvac.com</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>© {currentYear} ClimateRight HVAC. All rights reserved.</span>
            <span className="footer__license">TX License #TX-HVAC-2847 · BBB A+ Rating</span>
          </div>
          <div className="footer__insured">
            ✓ Licensed, Bonded &amp; Insured in the State of Texas
          </div>
          <div className="footer__bottom-right">
            NATE Certified · EPA 608 · ACCA Member
          </div>
        </div>
      </div>
    </footer>
  );
}
