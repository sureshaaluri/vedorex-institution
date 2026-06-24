"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { STRAPI_URL } from "@/lib/constants";

interface CourseCard {
  id: number;
  name: string;
  lessons: number;
  students: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  course_btn: string;
  courese_url: string;
  thumbnail: { url: string; alternativeText: string | null } | null;
}

interface TopCoursesData {
  __component: "section.top-courses";
  id: number;
  title: string;
  subtitle: string;
  coursecard: CourseCard[];
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

const styles = `
  .top-courses-wrapper {
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    background-color: #F0EEFF;
    padding: 20px clamp(16px, 4vw, 50px);
  }

  .top-courses-header {
    margin-bottom: 10px;
  }

  .top-courses-header h2 {
    font-weight: 700;
    color: #547cd3;
    margin-bottom: 0.5rem;
    font-size: clamp(1.2rem, 3vw, 2rem);
  }

  .top-courses-header p {
    color: #6b7280;
    margin: 0;
    font-size: clamp(13px, 2vw, 16px);
  }

  /* ── Grid: 3 col desktop ── */
  .courses-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* ── 2 col tablet ── */
  @media (max-width: 991px) {
    .courses-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  }

  /* ── 1 col small tablet ── */
  @media (max-width: 600px) {
    .courses-grid {
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
  }

  /* ── Horizontal scroll on mobile ── */
  @media (max-width: 425px) {
    .courses-grid {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      gap: 0.75rem;
      padding-bottom: 12px;
     
      /* hide scrollbar */
      scrollbar-width: none;
    }

    .courses-grid::-webkit-scrollbar {
      display: none;
    }

    .course-card-wrapper {
      min-width: 75vw;
      max-width: 75vw;
      flex-shrink: 0;
      scroll-snap-align: start;
    }
  }

  /* ── Card ── */
  .course-card {
    width: 100%;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(92,68,216,0.15);
  }

  /* ── Thumbnail ── */
  .course-thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    flex-shrink: 0;
  }

  .course-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 8px;
    box-sizing: border-box;
  }

  .course-thumbnail-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #5C44D8, #a855f7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
  }

  /* ── Content ── */
  .course-content {
    padding: 14px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-sizing: border-box;
  }

  .course-title {
    font-weight: 700;
    font-size: clamp(13px, 1.5vw, 15px);
    line-height: 1.5;
    margin: 0 0 0.6rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .course-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: clamp(10px, 1.2vw, 12px);
    color: #6b7280;
    margin-bottom: 0.75rem;
  }

  .course-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    gap: 0.5rem;
    flex-wrap: nowrap;
  }

  .course-btn {
    background: linear-gradient(80deg, #5C44D8, #547cd3);
    color: #fff;
    font-size: clamp(11px, 1.2vw, 13px);
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Rating circle ── */
  .rating-circle {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .rating-glow {
    position: absolute;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: #fef9c3;
  }

  .rating-svg {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .rating-value {
    font-size: 14px;
    font-weight: 700;
    color: #111;
    position: relative;
    z-index: 1;
  }

  .rating-star {
    position: absolute;
    top: 1px;
    right: 0;
  }
`;

function CourseCardItem({ card }: { card: CourseCard }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(card.rating / 5) * circumference} ${circumference}`;

  return (
    <div className="course-card">
      <div className="course-thumbnail">
        {card.thumbnail?.url ? (
          <img
            src={`${STRAPI_URL}${card.thumbnail.url}`}
            alt={card.thumbnail.alternativeText || card.name}
          />
        ) : (
          <div className="course-thumbnail-placeholder">No Image</div>
        )}
      </div>

      <div className="course-content">
        <h6 className="course-title">{card.name}</h6>

        <div className="course-meta">
          <span>🖥 Lesson: {card.lessons}</span>
          <span>👤 Student: {card.students}</span>
          <span style={{ color: LEVEL_COLORS[card.level] }}>🏆 {card.level}</span>
        </div>

        <div className="course-footer">
          <Link href={card.courese_url} className="course-btn">
            <span>{card.course_btn}</span>
            <span style={{ fontSize: 16 }}>›</span>
          </Link>

          <div className="rating-circle">
            <div className="rating-glow" />
            <svg className="rating-svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#fde68a" strokeWidth="6" />
              <defs>
                <linearGradient id={`grad-${card.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fde5d0" />
                  <stop offset="100%" stopColor="#f9a825" />
                </linearGradient>
              </defs>
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke={`url(#grad-${card.id})`}
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={strokeDasharray}
              />
            </svg>
            <span className="rating-value">{card.rating}</span>
            <div className="rating-star">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f9a825">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopCourses({ data }: { data: TopCoursesData }) {
  return (
    <>
      <style>{styles}</style>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="top-courses-wrapper">
          <div className="top-courses-header">
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>

          <div className="courses-grid">
            {data.coursecard.map((card) => (
              <motion.div
                key={card.id}
                className="course-card-wrapper"
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.9 },
                  show: {
                    opacity: 1, y: 0, scale: 1,
                    transition: { type: "spring", stiffness: 100, damping: 12 },
                  },
                }}
              >
                <CourseCardItem card={card} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}