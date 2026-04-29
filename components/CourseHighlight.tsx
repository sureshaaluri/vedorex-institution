"use client";

import styles from "./CourseHighlight.module.css";
import { motion } from "framer-motion";
const STRAPI_URL = "http://localhost:1337";

interface Feature {
  id: number;
  label: string;
  icon: {
    url: string;
    alternativeText: string | null;
  };
}

interface CourseHighlightData {
  __component: "section.course-highlight";
  tag: string;
  title: string;
  description: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
  feature: Feature[];
}

export default function CourseHighlight({ data }: { data: CourseHighlightData }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.section}>
        <div className={styles.row}>

          {/* Left Image */}
          <div className={styles.imageCol}>
            {data.image?.url && (
              <img
                src={`${STRAPI_URL}${data.image.url}`}
                alt={data.image.alternativeText || data.title}
              />
            )}
          </div>

          {/* Right Content */}
          <div className={styles.contentCol}>

            {/* Top section */}
            <div>
              <p className={styles.tag}>{data.tag}</p>
              <h2 className={styles.title}>{data.title}</h2>
              <p className={styles.description}>{data.description}</p>
            </div>

            {/* Features */}
            <div className={styles.features}>
              {data.feature.map((item) => (
                <div className={styles.featureCard} key={item.id}>
                  {item.icon?.url && (
                    <div className={styles.iconWrap}>
                      <img
                        src={`${STRAPI_URL}${item.icon.url}`}
                        alt={item.label}
                      />
                    </div>
                  )}
                  <p className={styles.featureLabel}>{item.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}