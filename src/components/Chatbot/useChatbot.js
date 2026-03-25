import { useState, useCallback } from 'react';
import { sendChatMessage, getQuickReplies } from './chatbotService';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm Aria, your ClimateRight HVAC assistant 👋 How can I help you today? Whether you need to schedule a service, troubleshoot an issue, or get pricing info — I'm here to help!",
  timestamp: new Date(),
  quickReplies: ['Schedule a Service', 'HVAC Troubleshooting', 'Get Pricing', 'Emergency Service'],
};

let msgCounter = 0;
function newId() {
  return `msg-${++msgCounter}-${Date.now()}`;
}

export function useChatbot() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: newId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      quickReplies: [],
    };

    setMessages((prev) => [...prev, userMsg]);

    const newHistory = [...conversationHistory, { role: 'user', content: text }];
    setConversationHistory(newHistory);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(newHistory);
      const quickReplies = getQuickReplies(response);

      const botMsg = {
        id: newId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        quickReplies,
      };

      setMessages((prev) => [...prev, botMsg]);
      setConversationHistory((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      const errMsg = {
        id: newId(),
        role: 'assistant',
        content: 'I\'m having trouble connecting right now. For immediate help, please call us at (555) 234-5678 or email info@climaterighthvac.com.',
        timestamp: new Date(),
        quickReplies: ['Call Now: (555) 234-5678', 'Try Again'],
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, conversationHistory]);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setConversationHistory([]);
  }, []);

  return { messages, isLoading, sendMessage, clearChat };
}
