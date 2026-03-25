import { useState, useEffect } from 'react';
import './EmergencyBar.css';

export default function EmergencyBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('emergencyBarDismissed');
    if (dismissed) setVisible(false);
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem('emergencyBarDismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="emergency-bar" role="alert">
      <div className="emergency-bar__inner">
        <p className="emergency-bar__text">
          🚨 24/7 Emergency Service Available — Call{' '}
          <a href="tel:5559114822">(555) 911-HVAC</a>
        </p>
        <button
          className="emergency-bar__close"
          onClick={handleClose}
          aria-label="Dismiss emergency bar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
