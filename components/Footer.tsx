"use client";

import { useState } from "react";
import Link from "next/link";
import { STRAPI_URL } from "@/lib/constants";
import "./Footer.css";

/* ================= TYPES ================= */

interface LinkItem {
  id: number;
  label: string;
  url: string;
}

interface LinkGroup {
  id: number;
  label: string;
  link_groups: LinkItem[];
}

interface FooterData {
  description: string;
  copyright: string;
  logo: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  link_group: LinkGroup[];
}

const API_URL = STRAPI_URL;

/* ── Social Icons ── */
const socialLinks = [
  {
    label: "Facebook",
    url: "https://facebook.com",
    icon: "https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png",
  },
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: "https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png",
  },
  {
    label: "Twitter",
    url: "https://twitter.com",
    icon: "https://img.icons8.com/ios-filled/24/ffffff/twitter.png",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon: "https://img.icons8.com/ios-filled/24/ffffff/linkedin.png",
  },
  {
    label: "YouTube",
    url: "https://youtube.com",
    icon: "https://img.icons8.com/ios-filled/24/ffffff/youtube-play.png",
  },
];

/* ── Labels that should be accordion on mobile ── */
const ACCORDION_GROUPS = ["Popular Courses", "Contact Info"];

/* ================= COMPONENT ================= */

export default function Footer({ footerData }: { footerData: FooterData }) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (!footerData) return null;

  const { description, copyright, logo, link_group } = footerData;

  const logoUrl = logo?.url ? `${API_URL}${logo.url}` : null;

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <footer className="footer ">
      <div className="container-fluid" style={{maxWidth: "1920px"}}>
      <div className="footer-content">
        
       

        {/* LEFT: Logo + Description + Social */}
        <div className="footer-left">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={logo.alternativeText || "Logo"}
              className="footer-logo"
            />
          )}
          {description && (
            <p className="footer-description">{description}</p>
          )}

          {/* Social Icons */}
          
          <div className="footer-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={s.label}
              >
                <img src={s.icon} alt={s.label} width={20} height={20} />
              </a>
            ))}
          </div>
        </div>

        {/* LINK GROUPS */}
        {link_group?.map((group) => {
          const isAccordion = ACCORDION_GROUPS.includes(group.label);
          const isOpen = openId === group.id;

          return (
            <div key={group.id} className="footer-group">

              {/* Title */}
              {isAccordion ? (
                /* Accordion toggle — only for Popular Courses & Contact Info */
                <button
                  className="footer-title accordion-title"
                  onClick={() => handleToggle(group.id)}
                  aria-expanded={isOpen}
                >
                  {group.label}
                  <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
                </button>
              ) : (
                /* Plain title — Quick Links always visible */
                <h4 className="footer-title static-title">{group.label}</h4>
              )}

              {/* Links */}
              <ul
                className={`footer-links ${
                  isAccordion ? (isOpen ? "active" : "") : "always-open"
                }`}
              >
                {group.link_groups?.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url || "#"}>{link.label}</Link>
                  </li>
                ))}
              </ul>

            </div>
          );
        })}

</div>
      </div>

      <hr className="footer-divider" />

      {copyright && <p className="footer-copyright">{copyright}</p>}
    </footer>
  );
}