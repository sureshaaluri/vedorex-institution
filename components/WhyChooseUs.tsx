"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { STRAPI_URL } from "@/lib/constants";

interface FeatureCard {
  id: number;
  name: string;
  description: string;
  duration: string;
  link_label: string;
  link_url: string;
  icon: { url: string; alternativeText: string | null } | null;
}

interface WhyChooseUsData {
  __component: "section.why-choose-us";
  id: number;
  title: string;
  subtitle: string;
  featurecard: FeatureCard[];
}

const styles = `
  .wcu-wrapper {
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    background-color: #F0EEFF;
    padding: 40px clamp(16px, 4vw, 50px);
    overflow: hidden;
  }

  .wcu-header {
    margin-bottom: 2rem;
  }

  .wcu-header h2 {
    font-weight: 700;
    color: #547cd3;
    margin-bottom: 0.5rem;
    font-size: clamp(1.2rem, 3vw, 2rem);
  }

  .wcu-header p {
    color: #6b7280;
    margin: 0;
    font-size: clamp(13px, 2vw, 16px);
  }

  /* ── Grid ── */
  .wcu-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1280px) {
    .wcu-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  @media (max-width: 600px) {
    .wcu-grid {
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
  }

  /* ── Mobile horizontal scroll ── */
  @media (max-width: 425px) {
    .wcu-grid {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      gap: 0.75rem;
      padding-bottom: 12px;
      
      scrollbar-width: none;
    }

    .wcu-grid::-webkit-scrollbar {
      display: none;
    }

    .wcu-card-wrapper {
      min-width: 75vw;
      max-width: 75vw;
      flex-shrink: 0;
      scroll-snap-align: start;
    }
  }

  /* ── Card ── */
  .wcu-card {
    width: 100%;
    height: 100%;
    padding: 24px 16px;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .wcu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(92,68,216,0.15);
  }

  /* ── Icon ── */
  .wcu-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #5C44D8, #a855f7);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 1rem;
  }

  .wcu-icon img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  /* ── Text ── */
  .wcu-name {
    font-weight: 700;
    font-size: clamp(14px, 1.5vw, 17px);
    margin: 0 0 0.5rem 0;
    color: #111;
  }

  .wcu-description {
    font-size: clamp(12px, 1.2vw, 14px);
    color: #6b7280;
    line-height: 1.6;
    flex-grow: 1;
    margin: 0 0 1rem 0;
  }

  /* ── Footer ── */
  .wcu-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    margin-top: auto;
  }

  .wcu-duration {
    font-size: 13px;
    color: #5C44D8;
    font-weight: 600;
    white-space: nowrap;
  }

  .wcu-link {
    font-size: 13px;
    color: #5C44D8;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
  }

  .wcu-link:hover {
    text-decoration: underline;
  }
`;

export default function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  return (
    <>
      <style>{styles}</style>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="wcu-wrapper">
          <div className="wcu-header">
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>

          <div className="wcu-grid">
            {data.featurecard.map((card) => (
              <div key={card.id} className="wcu-card-wrapper">
                <div className="wcu-card">
                  {/* Icon */}
                  <div className="wcu-icon">
                    {card.icon?.url ? (
                      <img
                        src={`${STRAPI_URL}${card.icon.url}`}
                        alt={card.icon.alternativeText || card.name}
                      />
                    ) : (
                      <span style={{ color: "#fff", fontSize: 22 }}>★</span>
                    )}
                  </div>

                  {/* Name */}
                  <h5 className="wcu-name">{card.name}</h5>

                  {/* Description */}
                  <p className="wcu-description">{card.description}</p>

                  {/* Footer */}
                  <div className="wcu-footer">
                    <span className="wcu-duration">{card.duration}</span>
                    <Link href={card.link_url} className="wcu-link">
                      {card.link_label} <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}