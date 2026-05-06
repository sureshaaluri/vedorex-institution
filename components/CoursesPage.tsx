"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./CoursesPage.module.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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

// ── UNIVERSAL BREADCRUMB ──
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
          {
            label: course.title,
            href: `/courses/${course.slug}`,
          },
        ]
      : []),
  ];

  return (
    <nav className={styles.breadcrumb}>
      {crumbs.map((c, i) => (
        <span key={i} className={styles.breadcrumbItem}>
          {i > 0 && <span className={styles.breadcrumbSep}>›</span>}
          {i === crumbs.length - 1 ? (
            <span className={styles.breadcrumbActive}>
              {c.label}
            </span>
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

// ── INNER ACCORDION (Lesson level) ──
function LessonAccordion({
  topic,
  index,
}: {
  topic: Topic;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: open ? "rgba(167,139,250,.05)" : "rgba(255,255,255,.02)",
        border: `1px solid ${open ? "rgba(167,139,250,.25)" : "rgba(255,255,255,.05)"}`,
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 6,
        transition: "border-color .2s",
      }}
    >
      {/* Lesson Header */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: open
              ? "rgba(167,139,250,.2)"
              : "rgba(255,255,255,.06)",
            border: `1px solid ${open ? "rgba(167,139,250,.3)" : "rgba(255,255,255,.1)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 9,
            color: open ? "#a78bfa" : "rgba(255,255,255,.4)",
            transition: "all .2s",
          }}
        >
          {open ? "▼" : "▶"}
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: open ? "#a78bfa" : "rgba(255,255,255,.8)",
            flex: 1,
            transition: "color .2s",
          }}
        >
          {topic.title}
        </span>
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,.2)",
            whiteSpace: "nowrap",
          }}
        >
          lesson {index + 1}
        </span>
      </button>

      {/* Lesson Content */}
      {open && (
        <div
          style={{
            padding: "10px 14px 14px 50px",
            borderTop: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "rgba(9, 7, 14, 0.55)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {topic.content}
          </p>
        </div>
      )}
    </div>
  );
}

// ── OUTER ACCORDION (Section level) ──
const SECTIONS = [
  { title: "Foundation"},
  { title: "Core concepts"},
  { title: "Advanced topics"},
  { title: "Project work"},
];

function NestedAccordion({ topics }: { topics: Topic[] }) {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const perSection = Math.ceil(topics.length / SECTIONS.length);
  const sections = SECTIONS.map((s, i) => ({
    ...s,
    lessons: topics.slice(i * perSection, (i + 1) * perSection),
  })).filter((s) => s.lessons.length > 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 24px" }}>
      {sections.map((section, idx) => {
        const isOpen = openSection === idx;
        return (
          <div
            key={idx}
            style={{
              background: "rgba(255,255,255,.03)",
              border: `1px solid ${isOpen ? "rgba(167,139,250,.3)" : "rgba(255,255,255,.07)"}`,
              borderRadius: 10,
              overflow: "hidden",
              transition: "border-color .2s",
            }}
          >
            {/* Section Header — Outer Accordion */}
            <button
              onClick={() => setOpenSection(isOpen ? null : idx)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 16px",
                background: isOpen ? "rgba(167,139,250,.06)" : "transparent",
                border: "none",
                color: "#1b0808",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background .2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Section number badge */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: isOpen
                      ? "rgba(167,139,250,.2)"
                      : "rgba(255,255,255,.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: isOpen ? "#a78bfa" : "rgba(255,255,255,.4)",
                    transition: "all .2s",
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <span style={{ fontSize: 16 }}>{section.icon}</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    
                    
                    
                    
                    
                    r: isOpen ? "#a78bfa" : "rgba(255,255,255,.9)",
                    transition: "color .2s",
                  }}
                >
                  {section.title}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,.3)",
                    background: "rgba(255,255,255,.05)",
                    padding: "2px 8px",
                    borderRadius: 50,
                  }}
                >
                  {section.lessons.length} lessons
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: isOpen ? "#a78bfa" : "rgba(255,255,255,.3)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .22s",
                  display: "inline-block",
                }}
              >
                ▾
              </span>
            </button>

            {/* Section Body — contains inner lesson accordions */}
            {isOpen && (
              <div
                style={{
                  padding: "12px 14px",
                  borderTop: "1px solid rgba(255,255,255,.06)",
                  background: "rgba(0,0,0,.15)",
                }}
              >
                {section.lessons.map((lesson, li) => (
                  <LessonAccordion
                    key={li}
                    topic={lesson}
                    index={idx * perSection + li}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function CoursesPage({ hero, courses }: Props) {
  const [selected, setSelected] = useState<Course>(courses?.[0]);

  return (
    <div>
      {/* HERO SECTION */}
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
            <div>
              <strong>{hero?.staCourses}</strong>
              <span>Courses</span>
            </div>
            <div>
              <strong>{hero?.statStudent}</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>{hero?.staprojects}</strong>
              <span>Projects</span>
            </div>
            <div>
              <strong>{hero?.statrating}⭐</strong>
              <span>Rating</span>
            </div>
          </div>
          <button className={styles.ctaBtn}>{hero?.heroctalable}</button>
        </div>
      </section>

      {/* LEARNING PATH */}
      {hero?.larningpath?.length > 0 && (
        <section className={styles.learningPath}>
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
      )}

      {/* BREADCRUMB */}
      <Breadcrumb course={selected} />

      {/* COURSES SECTION */}
      <section className={styles.coursesSection}>

        {/* LEFT — course list */}
        <div className={styles.sidebar}>
          {courses?.map((course) => (
            <div
              key={course.id}
              className={`${styles.card} ${selected?.id === course.id ? styles.active : ""}`}
              onClick={() => setSelected(course)}
            >
              <div className={styles.cardTop}>
                <span className={styles.category}>{course.category}</span>
                {course.badge && (
                  <span className={styles.badge}>{course.badge}</span>
                )}
              </div>
              <h3>{course.title}</h3>
              <div className={styles.cardMeta}>
                <span>{course.level}</span>
                <span>{course.duration}</span>
                <span>👥 {course.students}</span>
              </div>
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
            <div className={styles.detailMeta}>
              <span>📊 {selected.level}</span>
              <span>⏱ {selected.duration}</span>
              <span>👥 {selected.students} students</span>
              <span>{selected.price === 0 ? "🆓 Free" : `💰 ₹${selected.price}`}</span>
              <span>⭐ {selected.rating}</span>
            </div>

            {/* NESTED ACCORDION */}
            {selected.topics?.length > 0 && (
              <>
                <h4 className={styles.curriculumTitle}>
                  Course curriculum — {selected.topics.length} lessons
                </h4>
                <NestedAccordion topics={selected.topics} />
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