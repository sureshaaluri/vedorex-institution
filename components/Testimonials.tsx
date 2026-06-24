"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STRAPI_URL } from "@/lib/constants";

/* ================= TYPES ================= */

interface TestimonialCard {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: { url: string; alternativeText: string | null } | null;
}

interface TestimonialsData {
  __component: "section.testimonials";
  id: number;
  title: string;
  TestimonialsCard: TestimonialCard[];
}

/* ================= STYLES ================= */

const styles = `
.testimonials-wrapper{
  max-width:1440px;
  margin:auto;
  background:#F0EEFF;
  padding:60px 20px;
}

.testimonials-header h2{
  color:#547cd3;
  font-weight:700;
  margin-bottom:32px;
  text-align:center;
}

/* ---------- Slide ---------- */

.carousel-slide{
  background:#fff;
  border-radius:16px;
  padding:28px;
  border:1px solid rgba(92,68,216,.2);
  box-shadow:0 4px 24px rgba(92,68,216,.08);
}

/* ---------- GRID ---------- */

.carousel-cards-row{
  display:grid;
  gap:24px;
}

/* ✅ Mobile */
@media (max-width:767px){
  .carousel-cards-row{
    grid-template-columns:1fr;
  }
}

/* ✅ Tablet 768px */
@media (min-width:768px) and (max-width:1023px){
  .carousel-cards-row{
    grid-template-columns:repeat(3,1fr);
  }
}

/* ✅ Desktop */
@media (min-width:1024px){
  .carousel-cards-row{
    grid-template-columns:repeat(3,1fr);
  }
}

/* ---------- Card ---------- */

.t-card{
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.t-avatar,
.t-avatar-placeholder{
  width:72px;
  height:72px;
  border-radius:50%;
  margin-bottom:12px;
}

.t-avatar{
  object-fit:cover;
  border:3px solid #547cd3;
}

.t-avatar-placeholder{
  background:linear-gradient(135deg,#5C44D8,#547cd3);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  font-size:22px;
}

.t-stars{margin-bottom:12px;}
.t-star{font-size:20px;}

.t-quote{
  font-size:14px;
  color:#374151;
  font-style:italic;
  line-height:1.8;
  margin-bottom:18px;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.t-name{font-weight:700;margin:0;}
.t-role{font-size:13px;color:#6b7280;}

/* ---------- Controls ---------- */

.carousel-controls{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:16px;
  margin-top:28px;
}

.carousel-btn{
  width:38px;
  height:38px;
  border-radius:50%;
  border:2px solid #5C44D8;
  background:#fff;
  color:#5C44D8;
  cursor:pointer;
  font-size:18px;
}

.carousel-dots{
  display:flex;
  gap:8px;
}

.carousel-dot{
  width:6px;
  height:6px;
  border-radius:50%;
  border:none;
  background:#5C44D8;
  opacity:.3;
  cursor:pointer;
}

.carousel-dot.active{
  opacity:1;
  transform:scale(1.3);
}
`;

/* ================= HELPERS ================= */

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/* ================= COMPONENT ================= */

export default function Testimonials({ data }: { data: TestimonialsData }) {

  const [current, setCurrent] = useState(0);
  const [chunkSize, setChunkSize] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /* ✅ PERFECT RESPONSIVE */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 768) setChunkSize(1);
      else setChunkSize(3);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const chunks = chunk(data.TestimonialsCard, chunkSize);

  const next = () => setCurrent((c) => (c + 1) % chunks.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + chunks.length) % chunks.length);

  /* Auto Slide */
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [chunks.length]);

  return (
    <>
      <style>{styles}</style>

      <div className="testimonials-wrapper">
        <div className="testimonials-header">
          <h2>{data.title}</h2>
        </div>

        <div className="carousel-slide">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="carousel-cards-row"
              initial={{ opacity:0, x:60 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-60 }}
            >
              {chunks[current]?.map((card) => (
                <div key={card.id} className="t-card">

                  {card.avatar?.url ? (
                    <img
                      className="t-avatar"
                      src={`${STRAPI_URL}${card.avatar.url}`}
                      alt={card.name}
                    />
                  ) : (
                    <div className="t-avatar-placeholder">
                      {card.name.charAt(0)}
                    </div>
                  )}

                  <div className="t-stars">
                    {Array.from({ length:5 }).map((_,i)=>(
                      <span
                        key={i}
                        className="t-star"
                        style={{
                          color:i < card.rating ? "#f59e0b" : "#d1d5db"
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="t-quote">"{card.quote}"</p>
                  <p className="t-name">{card.name}</p>
                  <p className="t-role">{card.role}</p>

                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {chunks.length > 1 && (
            <div className="carousel-controls">
              

              <div className="carousel-dots">
                {chunks.map((_,i)=>(
                  <button
                    key={i}
                    className={`carousel-dot ${i===current?"active":""}`}
                    onClick={()=>setCurrent(i)}
                  />
                ))}
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}