"use client";

import React, { useState, useEffect } from "react";
import styles from "./VedorexWhatsApp.module.css";
import VedorexWhatsAppChat from "./VedorexWhatsAppChat";

export default function VedorexWhatsAppPopup({
  initialData = null,
  defaultView = "welcome",
  initialConversation = null,
}) {
  const [popupData, setPopupData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [currentView, setCurrentView] = useState(defaultView); // "welcome" | "chat"

  useEffect(() => {
    // If initialData is already passed and valid, use it
    if (initialData) {
      setPopupData(initialData);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const strapiBase =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://107.172.55.253:1338";
    const endpoint = `${strapiBase}/api/whats-app`;

    async function fetchWhatsAppSettings() {
      try {
        setLoading(true);
        const res = await fetch(endpoint, {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch WhatsApp config: ${res.status}`);
        }

        const json = await res.json();
        if (!isMounted) return;

        // Support both Strapi v4 (data.attributes) and Strapi v5 (data)
        const raw = json?.data?.attributes ? json.data.attributes : json?.data;

        if (raw) {
          const rawTitle = raw.title || "";
          const cleanTitle =
            rawTitle.replace(/Vedorex Support/gi, "Vedorex Academy") ||
            "Vedorex Academy";

          setPopupData({
            title: cleanTitle,
            welcomeMessage:
              raw.welcomeMessage ||
              "Hello! Welcome to Vedorex Academy. How can we help you?",
            phoneNumber: raw.phoneNumber || "9705444332",
            buttonText: raw.buttonText || "Chat on WhatsApp",
            isEnabled: raw.isEnabled !== undefined ? Boolean(raw.isEnabled) : true,
          });
        } else {
          setPopupData(null);
        }
      } catch (err) {
        console.error("VedorexWhatsAppPopup fetch error:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchWhatsAppSettings();

    return () => {
      isMounted = false;
    };
  }, [initialData]);

  // If loading, error, disabled in Strapi, or no data, do not display anything
  if (loading || error || !popupData) {
    return null;
  }

  // Strict requirement: If isEnabled is false, hide the popup completely
  if (popupData.isEnabled === false) {
    return null;
  }

  // Format current time for speech bubble
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Display "Vedorex Academy" consistently in header and welcome card
  const displayTitle =
    popupData.title?.replace(/Vedorex Support/gi, "Vedorex Academy") ||
    "Vedorex Academy";

  return (
    <>
      {isOpen ? (
        <aside
          className={styles.popupContainer}
          aria-label="WhatsApp Support Popup"
          role="complementary"
        >
          {currentView === "welcome" ? (
            <div>
              {/* WhatsApp Professional Green Header */}
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <div className={styles.whatsappIconWrap}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C16.6 3.67 20.3 7.37 20.3 11.92C20.3 16.47 16.59 20.15 12.04 20.15Z" />
                      <path d="M16.52 14.34C16.27 14.22 15.06 13.62 14.83 13.54C14.61 13.45 14.45 13.41 14.29 13.65C14.12 13.9 13.65 14.45 13.5 14.61C13.36 14.78 13.22 14.8 12.97 14.67C12.72 14.55 11.92 14.29 10.97 13.44C10.23 12.78 9.73 11.96 9.58 11.71C9.44 11.46 9.57 11.33 9.69 11.21C9.8 11.1 9.94 10.92 10.06 10.78C10.19 10.64 10.23 10.53 10.31 10.37C10.39 10.2 10.35 10.06 10.29 9.94C10.23 9.81 9.74 8.61 9.53 8.12C9.33 7.64 9.13 7.7 8.98 7.69C8.84 7.69 8.67 7.69 8.51 7.69C8.35 7.69 8.08 7.75 7.85 8C7.63 8.24 7 8.83 7 10.03C7 11.23 7.87 12.39 8 12.55C8.12 12.71 9.72 15.19 12.18 16.25C12.77 16.5 13.22 16.65 13.58 16.77C14.17 16.96 14.71 16.93 15.13 16.87C15.61 16.8 16.6 16.27 16.81 15.68C17.01 15.09 17.01 14.58 16.95 14.48C16.88 14.38 16.77 14.46 16.52 14.34Z" />
                    </svg>
                  </div>
                  <div className={styles.headerTextGroup}>
                    <h3 className={styles.headerTitle}>{displayTitle}</h3>
                    <div className={styles.headerSubtitle}>
                      <span className={styles.onlineDot}></span>
                      <span>Online • Quick Response</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close popup"
                  title="Close popup"
                >
                  ✕
                </button>
              </div>

              {/* Welcome Card Body */}
              <div className={styles.welcomeBody}>
                {/* Strapi Welcome Message in WhatsApp Speech Bubble */}
                <div className={styles.chatBubble}>
                  <div className={styles.senderName}>
                    <span>{displayTitle}</span>
                    <span style={{ fontSize: "10px", color: "#10b981" }}>✓</span>
                  </div>
                  <p className={styles.messageText}>{popupData.welcomeMessage}</p>
                  <div className={styles.messageMeta}>
                    <span className={styles.messageTime}>{currentTime}</span>
                    <span className={styles.checkmarks}>✓✓</span>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className={styles.actionArea}>
                  <button
                    type="button"
                    className={styles.chatButton}
                    onClick={() => setCurrentView("chat")}
                  >
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
                    <span>{popupData.buttonText}</span>
                  </button>

                  <p className={styles.subNotice}>
                    🔒 Vedorex Academy Official WhatsApp Support
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* WhatsApp In-Popup Chat Interface */
            <VedorexWhatsAppChat
              title={displayTitle}
              welcomeMessage={popupData.welcomeMessage}
              phoneNumber={popupData.phoneNumber}
              initialConversation={initialConversation}
              onBack={() => setCurrentView("welcome")}
              onClose={() => setIsOpen(false)}
            />
          )}
        </aside>
      ) : (
        /* Floating Re-Open Badge */
        <button
          type="button"
          className={styles.reopenBadge}
          onClick={() => {
            setIsOpen(true);
            setCurrentView("welcome");
          }}
          aria-label="Open WhatsApp Support"
          title="Open WhatsApp Support"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C16.6 3.67 20.3 7.37 20.3 11.92C20.3 16.47 16.59 20.15 12.04 20.15Z" />
            <path d="M16.52 14.34C16.27 14.22 15.06 13.62 14.83 13.54C14.61 13.45 14.45 13.41 14.29 13.65C14.12 13.9 13.65 14.45 13.5 14.61C13.36 14.78 13.22 14.8 12.97 14.67C12.72 14.55 11.92 14.29 10.97 13.44C10.23 12.78 9.73 11.96 9.58 11.71C9.44 11.46 9.57 11.33 9.69 11.21C9.8 11.1 9.94 10.92 10.06 10.78C10.19 10.64 10.23 10.53 10.31 10.37C10.39 10.2 10.35 10.06 10.29 9.94C10.23 9.81 9.74 8.61 9.53 8.12C9.33 7.64 9.13 7.7 8.98 7.69C8.84 7.69 8.67 7.69 8.51 7.69C8.35 7.69 8.08 7.75 7.85 8C7.63 8.24 7 8.83 7 10.03C7 11.23 7.87 12.39 8 12.55C8.12 12.71 9.72 15.19 12.18 16.25C12.77 16.5 13.22 16.65 13.58 16.77C14.17 16.96 14.71 16.93 15.13 16.87C15.61 16.8 16.6 16.27 16.81 15.68C17.01 15.09 17.01 14.58 16.95 14.48C16.88 14.38 16.77 14.46 16.52 14.34Z" />
          </svg>
        </button>
      )}
    </>
  );
}
