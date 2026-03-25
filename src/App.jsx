import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmergencyBar from './components/EmergencyBar';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import MobileCallBar from './components/MobileCallBar';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import AppointmentsPage from './pages/AppointmentsPage';
import FinancingPage from './pages/FinancingPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppInner() {
  const [emergencyBarVisible, setEmergencyBarVisible] = useState(
    !sessionStorage.getItem('emergencyBarDismissed')
  );

  // Sync with EmergencyBar dismissal
  useEffect(() => {
    const check = () => setEmergencyBarVisible(!sessionStorage.getItem('emergencyBarDismissed'));
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, []);

  const bodyOffset = emergencyBarVisible
    ? 'calc(var(--emergency-height) + var(--navbar-height))'
    : 'var(--navbar-height)';

  return (
    <>
      <EmergencyBar />
      <Navbar emergencyBarVisible={emergencyBarVisible} />
      <div style={{ paddingTop: bodyOffset }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/financing" element={<FinancingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
      <ChatbotWidget />
      <MobileCallBar />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
