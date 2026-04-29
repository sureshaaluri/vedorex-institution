"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CTAData {
  __component: "section.cta";
  id: number;
  title: string;
  Button: string;
  ButtonUrl: string;
}

export default function CTA({ data }: { data: CTAData }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "#F0EEFF",
        padding: "60px clamp(16px, 6vw, 80px)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: "absolute", width: 300, height: 300,
        borderRadius: "50%", background: "rgba(92,68,216,0.2)",
        top: "-80px", left: "-60px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 200, height: 200,
        borderRadius: "50%", background: "rgba(168,85,247,0.15)",
        bottom: "-50px", right: "10%", pointerEvents: "none",
      }} />

      <h2
        className="fw-bold mb-4"
        style={{
          fontSize: "clamp(24px, 3.5vw, 42px)",
          color: "#A855F7",
          position: "relative",
        }}
      >
        {data.title}
      </h2>

      <Link
        href={data.ButtonUrl}
        className="btn rounded-pill px-5 py-2"
        style={{
          background: "linear-gradient(135deg, #5C44D8, #a855f7)",
          color: "#fff",
          border: "none",
          fontSize: "16px",
          position: "relative",
        }}
      >
        {data.Button}
      </Link>
    </motion.section>
  );
}