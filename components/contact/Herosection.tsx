'use client';

import { motion } from "framer-motion";

interface HeroData {
  id: number;
  heading: string;
  subheading: string;
  Description: string;
  overlay_Color: string;
  background_image?: {
    url: string;
    alternativeText: string | null;
  };
  useCircleBackground?: boolean;
}

const STRAPI_URL = "http://localhost:1337";

export default function HeroSection({ data }: { data: HeroData }) {
  const useCircles = data.useCircleBackground ?? true;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: useCircles
            ? "radial-gradient(circle, #0447ffff 0%, #0c1e40 100%)"
            : `url(${STRAPI_URL}${data.background_image?.url || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Floating Orb Effect */}
      {useCircles && (
        <>
          <motion.div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(0, 66, 248, 0.4) 0%, transparent 70%)",
              borderRadius: "50%",
              zIndex: 1,
            }}
            animate={{
              y: [0, 40, 0],
              x: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            style={{
              position: "absolute",
              bottom: "-150px",
              left: "-150px",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(12, 30, 64, 0.3) 0%, transparent 70%)",
              borderRadius: "50%",
              zIndex: 1,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* SVG Circles with Animation */}
      {useCircles && (
        <motion.svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
          viewBox="0 0 1200 320"
          preserveAspectRatio="xMidYMid slice"
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.circle cx="600" cy="160" r="300" fill="none" stroke="black" strokeWidth="12" opacity="0.5"
            animate={{ r: [300, 310, 300] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="600" cy="160" r="260" fill="none" stroke="black" strokeWidth="12" opacity="0.5"
            animate={{ r: [260, 270, 260] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="600" cy="160" r="220" fill="none" stroke="black" strokeWidth="12" opacity="0.5"
            animate={{ r: [220, 230, 220] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="600" cy="160" r="180" fill="none" stroke="black" strokeWidth="12" opacity="0.5"
            animate={{ r: [180, 190, 180] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="600" cy="160" r="140" fill="none" stroke="black" strokeWidth="12" opacity="0.5"
            animate={{ r: [140, 150, 140] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="600" cy="160" r="100" fill="none" stroke="black" strokeWidth="12" opacity="0.5"
            animate={{ r: [100, 110, 100] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="600" cy="160" r="60" fill="none" stroke="black" strokeWidth="12" opacity="0.5"
            animate={{ r: [60, 70, 60] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      )}

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: data.overlay_Color,
          zIndex: 3,
        }}
      />

      {/* Content with Floating Animation */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 4,
          textAlign: "center",
          color: "white",
          maxWidth: "800px",
          padding: "0 12px",
        }}
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.p
          style={{
            textTransform: "uppercase",
            letterSpacing: "4px",
            fontSize: "14px",
            fontWeight: 500,
            opacity: 0.9,
            margin: 0,
            marginBottom: "8px",
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {data.subheading}
        </motion.p>

        <motion.h1
          style={{
            textTransform: "uppercase",
            fontSize: "clamp(24px, 4vw, 48px)",
            letterSpacing: "2px",
            fontWeight: "bold",
            margin: "8px 0 0 0",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.8, 1, 0.8],
            textShadow: [
              "0 0 20px rgba(30, 58, 138, 0.3)",
              "0 0 40px rgba(30, 58, 138, 0.6)",
              "0 0 20px rgba(30, 58, 138, 0.3)",
            ],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            textShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {data.heading}
        </motion.h1>

        <motion.p
          style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            maxWidth: "600px",
            margin: "16px auto 0",
            lineHeight: "1.6",
            fontWeight: "bold",
            textTransform: "lowercase",
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          {data.Description}
        </motion.p>
      </motion.div>
    </section>
  );
}
