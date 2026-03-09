import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ChatBot.css';

/**
 * Componente Chatbot RAG Multilingue
 * Integrado con el sistema de idiomas del portfolio
 */

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:5000/api';

// Textos según idioma
const TEXTS = {
  en: {
    title: "Gniné's AI Assistant",
    placeholder: "Ask me about AI projects, ESPRIT, or my experience...",
    send: "Send",
    clear: "Clear",
    typing: "Thinking...",
    error: "Something went wrong. Please try again.",
    welcome: "Hi! I'm Gniné's AI assistant. Ask me anything about her projects, skills, or background!",
    noResponse: "I couldn't generate a response. Please try again.",
  },
  fr: {
    title: "Assistant IA de Gniné",
    placeholder: "Posez-moi des questions sur les projets IA, ESPRIT, ou mon expérience...",
    send: "Envoyer",
    clear: "Effacer",
    typing: "Je réfléchis...",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    welcome: "Bonjour! Je suis l'assistant IA de Gniné. Posez-moi des questions sur ses projets, compétences ou parcours!",
    noResponse: "Je n'ai pas pu générer une réponse. Veuillez réessayer.",
  },
  bm: {
    title: "Gniné ka IA Ladon",
    placeholder: "N sɛbɛn: baara IA, ESPRIT, wala baara kan...",
    send: "Sɛnɛ",
    clear: "Buraya",
    typing: "N bɛ kuma...",
    error: "Jateminɛ bɔ. Ka sɛbɛn dɔ.",
    welcome: "I ni ce! Ni ye Gniné ka IA ladon. N sɛbɛn ni ka kan!",
    noResponse: "N bɛ kuma kɛ te. Ka sɛbɛn dɔ.",
  },
  ar: {
    title: "مساعد جنية في الذكاء الاصطناعي",
    placeholder: "اسأل عن مشاريع الذكاء الاصطناعي أو ESPRIT أو خبرتي...",
    send: "إرسال",
    clear: "مسح",
    typing: "أفكر...",
    error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    welcome: "مرحبا! أنا مساعد جنية في الذكاء الاصطناعي. اسأل عن مشاريعها أو مهاراتها أو رحلتها!",
    noResponse: "لم أتمكن من توليد رد. يرجى المحاولة مرة أخرى.",
  },
};

export default function ChatBot({ lang = 'en', isDark = true }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(uuidv4());
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const t = TEXTS[lang] || TEXTS.en;

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mensaje de bienvenida
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          type: 'bot',
          content: t.welcome,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [isOpen]);

  /**
   * Enviar mensaje al chatbot
   */
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          sessionId,
          userLang: lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const botMessage = {
        id: uuidv4(),
        type: 'bot',
        content: data.response || t.noResponse,
        sources: data.sources,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage = {
        id: uuidv4(),
        type: 'bot',
        content: t.error,
        isError: true,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar historial
   */
  const handleClear = async () => {
    try {
      await fetch(`${CHAT_API_URL}/clear-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      setMessages([
        {
          id: uuidv4(),
          type: 'bot',
          content: t.welcome,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      console.error('Clear session error:', error);
    }
  };

  /**
   * Manejar Enter para enviar
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        className="chat-bot-toggle"
        onClick={() => setIsOpen(true)}
        title="Open Chat"
        aria-label="Open chatbot"
      >
        <span className="chat-icon">💬</span>
      </button>
    );
  }

  return (
    <div className={`chat-bot-container ${isDark ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="chat-bot-header">
        <div className="chat-bot-title">
          <span className="chat-bot-icon">🤖</span>
          <h3>{t.title}</h3>
        </div>
        <button
          className="chat-bot-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close chatbot"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="chat-bot-messages">
        {messages.map(message => (
          <div
            key={message.id}
            className={`chat-message ${message.type} ${message.isError ? 'error' : ''}`}
          >
            <div className="message-content">
              {message.content}
              {message.sources && (
                <div className="message-sources">
                  <small>📚 Source: {message.sources}</small>
                </div>
              )}
            </div>
            <small className="message-time">
              {new Date(message.timestamp).toLocaleTimeString(lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}

        {loading && (
          <div className="chat-message bot loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <small>{t.typing}</small>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-bot-input">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.placeholder}
          disabled={loading}
          aria-label="Message input"
          rows="1"
        />
        <div className="chat-bot-actions">
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            className="chat-send-btn"
            aria-label={t.send}
          >
            {loading ? '⏳' : '📤'}
          </button>
          <button
            onClick={handleClear}
            disabled={loading}
            className="chat-clear-btn"
            title={t.clear}
            aria-label={t.clear}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="chat-bot-footer">
        <small>💡 Powered by Groq AI • {lang.toUpperCase()}</small>
      </div>
    </div>
  );
}
