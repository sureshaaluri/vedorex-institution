"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import styles from "./CoursesPage.module.css";
import { STRAPI_URL } from "@/lib/constants";

interface Topic {
  title: string;
  content: string;
}

interface Course {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  category: string;
  instuctor: string | null;
  duration: string;
  students: number;
  rating: number;
  badge: string | null;
  topics: Topic[];
  ispublic: boolean;
  price: number;
  is_featured: boolean | null;
}

interface HeroData {
  Hero_Heading: string;
  hero_Subheading: string;
  herodescription: string;
  heroctalable: string;
  statStudent: string;
  staprojects: string;
  staCourses: string;
  statrating: number;
  heroimage: { url: string }[];
  larningpath: {
    id: number;
    title: string;
    routepath: {
      id: number;
      title: string;
    }[];
  }[];
}

interface Props {
  hero: HeroData;
  courses: Course[];
}

// ── BREADCRUMB ──
function Breadcrumb({ course }: { course: Course | null }) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    ...(course
      ? [
          {
            label: course.category || "Course",
            href: `/courses?category=${(course.category || "").toLowerCase().replace(/\s+/g, "-")}`,
          },
          { label: course.title, href: `/courses/${course.slug}` },
        ]
      : []),
  ];

  return (
    <nav className={styles.breadcrumb}>
      {crumbs.map((c, i) => (
        <span key={i} className={styles.breadcrumbItem}>
          {i > 0 && <span className={styles.breadcrumbSep}>›</span>}
          {i === crumbs.length - 1 ? (
            <span className={styles.breadcrumbActive}>{c.label}</span>
          ) : (
            <Link href={c.href} className={styles.breadcrumbLink}>
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

// ── SINGLE ACCORDION ──
function SingleAccordion({
  topics,
  courseTitle,
}: {
  topics: Topic[];
  courseTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ margin: "12px 0 24px" }}>
      <div
        style={{
          background: isOpen
            ? "rgba(167,139,250,.08)"
            : "rgba(255,255,255,.03)",
          border: `1px solid ${isOpen ? "rgba(167,139,250,.35)" : "rgba(255,255,255,.08)"}`,
          borderRadius: 8,
          overflow: "hidden",
          transition: "all .2s",
        }}
      >
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: isOpen ? "#a78bfa" : "#020101",
              flex: 1,
              transition: "color .2s",
            }}
          >
            Course Curriculum — {topics.length} topics
          </span>
          <span
            style={{
              fontSize: 16,
              color: isOpen ? "#a78bfa" : "rgba(0,0,0,0.4)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform .22s",
              display: "inline-block",
            }}
          >
            ▾
          </span>
        </button>

        {/* Body */}
        {isOpen && (
          <div
            style={{
              padding: "8px 20px 24px 20px",
              borderTop: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Course title */}
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "16px 0 16px",
              }}
            >
              {courseTitle}
            </h3>

            {/* Each topic = section heading + bullet points from content */}
            {topics.map((topic, i) => {
              // Split content into bullet points by ". " or ","
              const bullets = topic.content
                ? topic.content
                    .split(/[.,;]\s*/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];
              return (
                <div key={i} style={{ marginBottom: 16 }}>
                  {/* Section heading in blue */}
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#2563eb",
                      margin: "0 0 8px",
                    }}
                  >
                    {topic.title}
                  </p>

                  {/* Bullet points from content */}
                  <ul
                    style={{
                      listStyle: "disc",
                      paddingLeft: 22,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {bullets.map((point, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: 13,
                          color: "#1a1a2e",
                          lineHeight: 1.6,
                        }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function CoursesPage({ hero, courses }: Props) {
  const [selected, setSelected] = useState<Course>(courses?.[0]);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const learningpathRef = useRef<HTMLDivElement>(null); // ← added

  function selectCourse(course: Course) {
    setSelected(course);
    setTimeout(() => {
      if (learningpathRef.current) {
        const navHeight = document.querySelector('nav')?.offsetHeight ?? 64;
        const top = learningpathRef.current.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  }

  return (
    <div>
      {/* HERO */}
      <section
        className={styles.hero}
        style={{
          backgroundImage: hero?.heroimage?.[0]?.url
            ? `url(${STRAPI_URL}${hero.heroimage[0].url})`
            : undefined,
        }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{hero?.Hero_Heading}</h1>
          <h2 className={styles.heroSubtitle}>{hero?.hero_Subheading}</h2>
          <p className={styles.heroDescription}>{hero?.herodescription}</p>
          <div className={styles.stats}>
            {/* <div>
              <strong>{hero?.staCourses}</strong>
              <span>Courses</span>
            </div> */}
            {/* <div>
              <strong>{hero?.statStudent}</strong>
              <span>Students</span>
            </div> */}
            {/* <div>
              <strong>{hero?.staprojects}</strong>
              <span>Projects</span>
            </div> */}
            {/* <div>
              <strong>{hero?.statrating}⭐</strong>
              <span>Rating</span>
            </div> */}
          </div>
          <button className={styles.ctaBtn}>{hero?.heroctalable}</button>
        </div>
      </section>

      {/* LEARNING PATH */}
      {hero?.larningpath?.length > 0 && (
        <div ref={learningpathRef}>
          <section className={styles.learningPath} style={{ scrollMarginTop: "80px" }}> {/* ← added scrollMarginTop */}
            <h2>{hero.larningpath[0].title}</h2>
            <div className={styles.routepath}>
              {hero.larningpath[0].routepath.map((step, index) => (
                <div key={step.id} className={styles.routeStep}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  {index < hero.larningpath[0].routepath.length - 1 && (
                    <span className={styles.arrow}>→</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* BREADCRUMB */}
      <div ref={breadcrumbRef}> {/* ← added wrapper */}
        <Breadcrumb course={selected} />
      </div>

      {/* COURSES SECTION */}
      <section className={styles.coursesSection}>
        {/* LEFT — course list */}
        <div className={styles.sidebar}>
          {courses?.map((course) => (
            <div
              key={course.id}
              className={`${styles.card} ${selected?.id === course.id ? styles.active : ""}`}
              onClick={() => selectCourse(course)} // ← changed from setSelected
            >
              <div className={styles.cardTop}>
                <span className={styles.category}>{course.category}</span>
                {course.badge && (
                  <span className={styles.badge}>{course.badge}</span>
                )}
              </div>
              <h3>{course.title}</h3>
              {/* <div className={styles.cardMeta}>
                <span>{course.level}</span>
                <span>{course.duration}</span>
                <span>👥 {course.students}</span>
              </div> */}
            </div>
          ))}
        </div>

        {/* RIGHT — course detail */}
        {selected && (
          <div className={styles.detail} key={selected.id}>
            <div className={styles.detailHeader}>
              <span className={styles.category}>{selected.category}</span>
              {selected.badge && (
                <span className={styles.badge}>{selected.badge}</span>
              )}
            </div>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            {/* <div className={styles.detailMeta}>
              <span>📊 {selected.level}</span>
              <span>⏱ {selected.duration}</span>
              <span>👥 {selected.students} students</span>
              <span>
                {selected.price === 0 ? "🆓 Free" : `💰 ₹${selected.price}`}
              </span>
              <span>⭐ {selected.rating}</span>
            </div> */}

            {selected.topics?.length > 0 && (
              <>
                <SingleAccordion topics={selected.topics} courseTitle={selected.title} />
              </>
            )}

            <Link
              href="/contact"
              className={styles.enrollBtn}
              style={{ textDecoration: "none" }}
            >
              Enroll Now →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}