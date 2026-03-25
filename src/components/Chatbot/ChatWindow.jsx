import { useRef, useEffect, useState, useCallback } from 'react';
import './ChatWindow.css';

function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function Message({ msg, onQuickReply, isLatest }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat-message chat-message--${msg.role}`}>
      <div className="chat-message__row">
        {!isUser && (
          <div className="chat-message__avatar">🤖</div>
        )}
        <div className="chat-message__bubble" style={{ whiteSpace: 'pre-wrap' }}>
          {msg.content}
        </div>
      </div>
      <span className="chat-message__time">{formatTime(msg.timestamp)}</span>
      {!isUser && isLatest && msg.quickReplies?.length > 0 && (
        <div className="chat-quick-replies">
          {msg.quickReplies.map((qr) => (
            <button
              key={qr}
              className="chat-quick-reply"
              onClick={() => onQuickReply(qr)}
            >
              {qr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat-message chat-message--assistant">
      <div className="chat-message__row">
        <div className="chat-message__avatar">🤖</div>
        <div className="chat-typing">
          <div className="chat-typing__dots">
            <div className="chat-typing__dot" />
            <div className="chat-typing__dot" />
            <div className="chat-typing__dot" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({ isOpen, onClose, messages, isLoading, onSend, onClear }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    onSend(text);
  }, [input, isLoading, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (text) => {
    if (!isLoading) onSend(text);
  };

  const lastAssistantIdx = messages.reduce((acc, m, i) => m.role === 'assistant' ? i : acc, -1);

  return (
    <div className={`chat-window${isOpen ? ' chat-window--open' : ''}`} role="dialog" aria-label="ClimateRight HVAC Chat">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header__avatar">
          ❄️
          <span className="chat-header__online" />
        </div>
        <div className="chat-header__info">
          <div className="chat-header__name">Aria — HVAC Assistant</div>
          <div className="chat-header__status">Online · ClimateRight HVAC</div>
        </div>
        <div className="chat-header__actions">
          <button className="chat-header__btn" onClick={onClear} title="Clear chat" aria-label="Clear chat">
            🔄
          </button>
          <button className="chat-header__btn" onClick={onClose} title="Close chat" aria-label="Close chat">
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <Message
            key={msg.id}
            msg={msg}
            onQuickReply={handleQuickReply}
            isLatest={i === lastAssistantIdx}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <div className="chat-input-row">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Chat message input"
          />
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
        <p className="chat-input-footer">
          Powered by ClimateRight HVAC · (555) 234-5678
        </p>
      </div>
    </div>
  );
}
