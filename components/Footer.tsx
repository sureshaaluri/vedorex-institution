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

/* ── Dummy Link Groups ── */
const DUMMY_LINK_GROUPS: LinkGroup[] = [
  {
    id: 1,
    label: "Quick Links",
    link_groups: [
      { id: 1, label: "Home", url: "/" },
      { id: 2, label: "About Us", url: "/about" },
      { id: 3, label: "Services", url: "/services" },
      { id: 4, label: "Blog", url: "/blog" },
      { id: 5, label: "Contact", url: "/contact" },
    ],
  },
  {
    id: 2,
    label: "Popular Courses",
    link_groups: [
      { id: 6, label: "Web Development", url: "/courses/web-development" },
      { id: 7, label: "Mobile App Design", url: "/courses/mobile-app-design" },
      { id: 8, label: "Data Science 101", url: "/courses/data-science" },
      { id: 9, label: "UI/UX Design", url: "/courses/ui-ux-design" },
      { id: 10, label: "Advanced JavaScript", url: "/courses/javascript" },
    ],
  },
  {
    id: 3,
    label: "Contact Info",
    link_groups: [
      { id: 11, label: "Email: info@example.com", url: "mailto:info@example.com" },
      { id: 12, label: "Phone: +1 (555) 123-4567", url: "tel:+15551234567" },
      { id: 13, label: "Address: 123 Main St, City, Country", url: "#" },
      { id: 14, label: "Support Hours: 9AM - 6PM", url: "#" },
    ],
  },
];

/* ── Labels that should be accordion on mobile ── */
const ACCORDION_GROUPS = ["Popular Courses", "Contact Info"];

/* ================= COMPONENT ================= */

export default function Footer({ footerData }: { footerData?: FooterData }) {
  const [openId, setOpenId] = useState<number | null>(null);

  // Use dummy data if footerData is not provided or doesn't have link groups
  const linkGroups = footerData?.link_group?.length ? footerData.link_group : DUMMY_LINK_GROUPS;
  
  const description = footerData?.description || "Your company description goes here. We provide excellent services and support to help your business grow and succeed.";
  const copyright = footerData?.copyright || "© 2024 Your Company. All rights reserved.";
  const logo = footerData?.logo || null;

  const logoUrl = logo?.url ? `${API_URL}${logo.url}` : null;

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <footer className="footer">
      <div className="container-fluid" style={{ maxWidth: "1920px" }}>
        <div className="footer-content">
          {/* LEFT: Logo + Description + Social */}
          <div className="footer-left">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={logo?.alternativeText || "Logo"}
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
          {linkGroups?.map((group) => {
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
                      <Link href={link.url || ""}>{link.label}</Link>
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