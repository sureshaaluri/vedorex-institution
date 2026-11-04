"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./VedorexWhatsApp.module.css";

export default function VedorexWhatsAppChat({
  title = "Vedorex Academy",
  welcomeMessage = "Hello! Welcome to Vedorex Academy. How can we help you?",
  phoneNumber = "9705444332",
  initialConversation = null,
  onBack,
  onClose,
}) {
  const displayTitle = "Vedorex Academy";

  const [messages, setMessages] = useState(
    initialConversation?.messages || [
      {
        id: "initial-welcome",
        sender: "support",
        text: welcomeMessage,
        time: getCurrentTime(),
      },
    ]
  );
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clean phone number for display & direct WhatsApp link
  const cleanPhone = (phoneNumber || "").replace(/[^0-9]/g, "");
  const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  const handleSendMessage = (e) => {
    e?.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Deliver the message to the Vedorex WhatsApp number (opens WhatsApp
    // Web/app with the text prefilled; the user presses send there).
    if (fullPhone) {
      const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(trimmed)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }

    // Simulated automated assistant acknowledgement from Vedorex Academy
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "support",
          text: "Thank you for reaching out! A Vedorex Academy counselor has received your inquiry. We are here to help you accelerate your tech career.",
          time: getCurrentTime(),
        },
      ]);
    }, 700);
  };

  return (
    <div className={styles.chatContainer}>
      {/* WhatsApp Chat Header */}
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Back to Welcome Screen"
            title="Back to Welcome Screen"
          >
            ←
          </button>

          <div className={styles.chatAvatar}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C16.6 3.67 20.3 7.37 20.3 11.92C20.3 16.47 16.59 20.15 12.04 20.15Z" />
              <path d="M16.52 14.34C16.27 14.22 15.06 13.62 14.83 13.54C14.61 13.45 14.45 13.41 14.29 13.65C14.12 13.9 13.65 14.45 13.5 14.61C13.36 14.78 13.22 14.8 12.97 14.67C12.72 14.55 11.92 14.29 10.97 13.44C10.23 12.78 9.73 11.96 9.58 11.71C9.44 11.46 9.57 11.33 9.69 11.21C9.8 11.1 9.94 10.92 10.06 10.78C10.19 10.64 10.23 10.53 10.31 10.37C10.39 10.2 10.35 10.06 10.29 9.94C10.23 9.81 9.74 8.61 9.53 8.12C9.33 7.64 9.13 7.7 8.98 7.69C8.84 7.69 8.67 7.69 8.51 7.69C8.35 7.69 8.08 7.75 7.85 8C7.63 8.24 7 8.83 7 10.03C7 11.23 7.87 12.39 8 12.55C8.12 12.71 9.72 15.19 12.18 16.25C12.77 16.5 13.22 16.65 13.58 16.77C14.17 16.96 14.71 16.93 15.13 16.87C15.61 16.8 16.6 16.27 16.81 15.68C17.01 15.09 17.01 14.58 16.95 14.48C16.88 14.38 16.77 14.46 16.52 14.34Z" />
            </svg>
          </div>

          <div className={styles.headerTextGroup}>
            <div className={styles.headerTitle}>{displayTitle}</div>
            <div className={styles.headerSubtitle}>
              <span className={styles.onlineDot}></span>
              <span>Online • Vedorex Academy</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Chat"
          title="Close Chat"
        >
          ✕
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className={styles.messagesList}>
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={isUser ? styles.messageRowOut : styles.messageRowIn}
            >
              <div
                className={
                  isUser ? styles.messageBubbleOut : styles.messageBubbleIn
                }
              >
                {!isUser && (
                  <div className={styles.senderName}>{displayTitle}</div>
                )}
                <p className={styles.messageText}>{msg.text}</p>
                <div className={styles.messageMeta}>
                  <span className={styles.messageTime}>{msg.time}</span>
                  <span className={styles.checkmarks}>✓✓</span>
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form className={styles.chatInputBar} onSubmit={handleSendMessage}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={!inputText.trim()}
          aria-label="Send message"
          title="Send message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}
