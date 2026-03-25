import { Link } from 'react-router-dom';
import './MobileCallBar.css';

export default function MobileCallBar() {
  return (
    <div className="mobile-call-bar">
      <a href="tel:5552345678" className="mobile-call-bar__call">
        <span className="mobile-call-bar__icon">📞</span>
        Call Now
      </a>
      <div className="mobile-call-bar__divider" />
      <Link to="/appointments" className="mobile-call-bar__book">
        <span className="mobile-call-bar__icon">📅</span>
        Book Service
      </Link>
    </div>
  );
}
