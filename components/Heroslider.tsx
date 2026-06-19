"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./Heroslider.module.css";
import { motion } from "framer-motion";
import { STRAPI_URL } from "@/lib/constants";

interface Stat {
  id: number;
  number: string;
  label: string;
}

interface Slide {
  id: number;
  title: string;
  highlighted_text: string;
  description: string;
  primary_btn_label: string;
  primary_btn_url: string;
  secondary_btn_label: string;
  secondary_btn_url: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
  stats: Stat[];
}

interface HeroSliderData {
  __component: "section.hero-slider";
  slider: Slide[];
}

export default function HeroSlider({ data }: { data: HeroSliderData }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        if ((window as any).bootstrap) {
          const carouselEl = document.getElementById("heroCarousel");
          if (carouselEl) {
            const existing = (window as any).bootstrap.Carousel.getInstance(
              carouselEl,
            );
            if (existing) existing.dispose();

            const carousel = new (window as any).bootstrap.Carousel(
              carouselEl,
              {
                interval: 4000,
                ride: "carousel",
                wrap: true,
                pause: "hover",
              },
            );

            carouselEl.addEventListener("mouseenter", () => carousel.pause());
            carouselEl.addEventListener("mouseleave", () => carousel.cycle());
          }
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
          width: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
          backgroundColor: "#F0EEFF",
        }}
      >
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            {data.slider.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                style={{
                  width: "12px", 
                  height: "12px",
                  borderRadius: "50%", 
                  backgroundColor: "#fff",
                  border: "none",
                  opacity: index === 0 ? "1" : "0.5", 
                  transition: "opacity 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {data.slider.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div
                  style={{
                    padding: "30px clamp(16px, 6vw, 50px)",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative bubbles */}
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      width: 320,
                      height: 320,
                      background: "rgba(92, 68, 216, 0.12)",
                      top: "-50px",
                      left: "-60px",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      width: 200,
                      height: 200,
                      background: "rgba(168, 85, 247, 0.1)",
                      top: "20px",
                      left: "180px",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      width: 150,
                      height: 150,
                      background: "rgba(92, 68, 216, 0.08)",
                      bottom: "-40px",
                      left: "30%",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      width: 250,
                      height: 250,
                      background: "rgba(168, 85, 247, 0.07)",
                      bottom: "-60px",
                      right: "-40px",
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    className="row align-items-center w-100 g-3"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    {/* Left Content */}
                    <div className="col-lg-6">
                      <h1
                        className={`fw-bold mb-3 ${styles.heading}`}
                        style={{
                          // fontSize and media query moved to CSS module
                          lineHeight: "1.2",
                        }}
                      >
                        {slide.title}{" "}
                        <span style={{ color: "#547cd3" }}>
                          {slide.highlighted_text}
                        </span>
                      </h1>
                      <p
                        className={`text-secondary mb-4 ${styles.description}`}
                        style={{
                          // Static styles moved to CSS module
                        }}
                      >
                        {slide.description}
                      </p>
                      <div className={styles.btnGroup}>
                        <Link
                          href={slide.primary_btn_url || "#"}
                          className={`btn rounded-pill ${styles.primaryBtn}`}
                        >
                          {slide.primary_btn_label}
                        </Link>
                        <Link
                          href={slide.secondary_btn_url || "#"}
                          className={`btn rounded-pill ${styles.secondaryBtn}`}
                        >
                          {slide.secondary_btn_label}
                        </Link>
                      </div>
                    </div>

                    {/* Right Image with Stats Overlay */}
                    <div className={`col-lg-6 text-center ${styles.gap3}`}>
                      {slide.image?.url && (
                        <div className="position-relative d-inline-block w-100">
                          <img
                            src={`${STRAPI_URL}${slide.image.url}`}
                            alt={slide.image.alternativeText || slide.title}
                            className={`img-fluid rounded-4 ${styles.heroImage}`}
                          />
                          {slide.stats.length > 0 && (
                            <div
                              className={`position-absolute bottom-0 start-0 end-0 d-flex ${styles.statsOverlay}`}
                            >
                              {slide.stats.map((stat) => (
                                <div
                                  key={stat.id}
                                  className={`flex-fill text-center py-3 ${styles.statItem}`}
                                >
                                  <div
                                    className="fw-bold text-white"
                                    style={{ fontSize: "22px" }}
                                  >
                                    {stat.number}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "rgba(255, 255, 255, 1)",
                                    }}
                                  >
                                    {stat.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className={`carousel-control-prev ${styles.carouselPrev}`}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>
          <button
            className={`carousel-control-next ${styles.carouselNext}`}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
