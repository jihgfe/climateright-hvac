import { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import { useChatbot } from './useChatbot';
import './ChatbotWidget.css';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showPromo, setShowPromo] = useState(false);
  const { messages, isLoading, sendMessage, clearChat } = useChatbot();

  // Show proactive bubble after 8s if user hasn't opened chat yet
  useEffect(() => {
    if (sessionStorage.getItem('chatPromoSeen')) return;
    const t = setTimeout(() => {
      if (!isOpen) {
        setShowPromo(true);
        sessionStorage.setItem('chatPromoSeen', '1');
      }
    }, 8000);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Clear unread badge when opened
  useEffect(() => {
    if (isOpen) setUnread(0);
  }, [isOpen]);

  // Increment unread if new bot message comes in while closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === 'assistant') {
        setUnread((n) => n + 1);
      }
    }
  }, [messages, isOpen]);

  const handleToggle = () => {
    setIsOpen((o) => !o);
    setShowPromo(false);
  };

  const handleClose = () => setIsOpen(false);

  const handleClear = () => {
    clearChat();
  };

  return (
    <div className="chatbot-widget" aria-live="polite">
      <ChatWindow
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        isLoading={isLoading}
        onSend={sendMessage}
        onClear={handleClear}
      />
      {showPromo && !isOpen && (
        <div className="chatbot-widget__promo" onClick={handleToggle}>
          👋 Need help choosing a service? Ask Aria!
          <button
            className="chatbot-widget__promo-close"
            onClick={(e) => { e.stopPropagation(); setShowPromo(false); }}
            aria-label="Dismiss"
          >✕</button>
        </div>
      )}
      <button
        className={`chatbot-widget__btn${isOpen ? ' chatbot-widget__btn--open' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close chat' : 'Open HVAC assistant chat'}
        aria-expanded={isOpen}
      >
        {!isOpen && <div className="chatbot-widget__pulse" />}
        {isOpen ? '✕' : '💬'}
        {!isOpen && unread > 0 && (
          <span className="chatbot-widget__badge">{unread}</span>
        )}
        {!isOpen && (
          <span className="chatbot-widget__tooltip">Chat with Aria 👋</span>
        )}
      </button>
    </div>
  );
}
