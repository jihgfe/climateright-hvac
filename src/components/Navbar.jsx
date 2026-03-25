import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/financing', label: 'Financing' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ emergencyBarVisible }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const topOffset = emergencyBarVisible ? 'var(--emergency-height)' : '0px';

  return (
    <>
      <nav
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        style={{ top: topOffset }}
      >
        <div className="navbar__inner">
          <NavLink to="/" className="navbar__logo" onClick={() => setDrawerOpen(false)}>
            <span className="navbar__logo-icon">❄️</span>
            <span className="navbar__logo-text">
              <span className="navbar__logo-name">ClimateRight</span>
              <span className="navbar__logo-sub">HVAC</span>
            </span>
          </NavLink>

          <nav className="navbar__links">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__right">
            <a href="tel:5552345678" className="navbar__phone">
              <span className="navbar__phone-icon">📞</span>
              (555) 234-5678
            </a>
            <a href="tel:5559114822" className="navbar__emergency-btn">
              🚨 24/7 Emergency
            </a>
          </div>

          <button
            className={`navbar__hamburger${drawerOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle menu"
            aria-expanded={drawerOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`navbar__drawer${drawerOpen ? ' navbar__drawer--open' : ''}`}
        style={{ paddingTop: `calc(${topOffset} + var(--navbar-height) + var(--space-6))` }}
      >
        <div className="navbar__drawer-links">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
              }
              onClick={() => setDrawerOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="navbar__drawer-ctas">
          <a href="tel:5552345678" className="navbar__drawer-phone" onClick={() => setDrawerOpen(false)}>
            📞 (555) 234-5678
          </a>
          <a href="tel:5559114822" className="navbar__drawer-emergency" onClick={() => setDrawerOpen(false)}>
            🚨 24/7 Emergency: (555) 911-HVAC
          </a>
        </div>
      </div>
    </>
  );
}
