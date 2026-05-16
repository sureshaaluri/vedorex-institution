'use client';
import { useEffect, useState } from 'react';

export default function WelcomePopup({ data }: { data: any }) {
  const [visible, setVisible] = useState(false);

 useEffect(() => {
  // Only show on home page
  if (window.location.pathname === '/') {
    setVisible(true);
  }
}, []);

  const close = () => {
    setVisible(false);
  };

  if (!visible || !data) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          width: "100%",
          maxWidth: 448,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#042C53",
            padding: "1.75rem 2rem",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              fontSize: "1.1rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            ✕
          </button>

          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 0.75rem",
              fontSize: "1.5rem",
            }}
          >
            🏛️
          </div>

          <h1
            style={{
              color: "#fff",
              fontSize: "1.15rem",
              fontWeight: 700,
              margin: 0,
              fontFamily: "serif",
            }}
          >
            {data.title}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginTop: "0.25rem",
              marginBottom: 0,
            }}
          >
            {data.subtitle}
          </p>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "1.25rem 2rem",
            textAlign: "center",
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
            {data.description}
          </p>
        </div>

        {/* Contact */}
        {/* <div style={{ padding: "1.25rem 2rem" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#9ca3af",
              marginBottom: "0.75rem",
            }}
          >
            Get in touch
          </p> */}

          {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div style={{ background: "#f9fafb", borderRadius: 6, padding: "0.75rem" }}>
              <span style={{ display: "block", fontSize: "0.62rem", color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 }}>Phone</span>
              <span style={{ fontWeight: 600, color: "#1f2937", fontSize: "0.85rem" }}>{data.phone}</span>
            </div>
            <div style={{ background: "#f9fafb", borderRadius: 6, padding: "0.75rem" }}>
              <span style={{ display: "block", fontSize: "0.62rem", color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 }}>Email</span>
              <span style={{ fontWeight: 600, color: "#1f2937", fontSize: "0.85rem" }}>{data.email}</span>
            </div>
          </div>

          <div style={{ background: "#f9fafb", borderRadius: 6, padding: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ display: "block", fontSize: "0.62rem", color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 }}>Address</span>
            <span style={{ fontWeight: 600, color: "#1f2937", fontSize: "0.85rem" }}>{data.address}</span>
          </div> */}

          <button
            onClick={close}
            style={{
              width: "100%",
              background: "#042C53",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0C447C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#042C53")}
          >
            Enter the website
          </button>
        </div>
      </div>
    // </div>
  );
}