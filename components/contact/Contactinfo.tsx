"use client";
import { STRAPI_URL } from "@/lib/constants";
interface Card {
  id: number;
  tag_label: string;
  title: string;
  lines: string;
  icon?: { url: string } | null;
}

interface ContactInfoData {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  cards: Card[];
}


// ✅ icon fallback emojis
const iconFallback: Record<string, string> = {
  // LOCATION: "📍",
  // PHONE: "📞",
  // EMAIL: "✉️",
  // HOURS: "🕐",
};

export default function ContactInfo({ data }: { data: ContactInfoData }) {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            {data.heading}{" "}
            <span style={{ color: "#547cd3" }}>{data.subheading}</span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            {data.description}
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {data.cards.map((card) => (
            <div key={card.id} className="col-12 col-sm-6 col-lg-3">
              <div
                className="h-100 p-4 text-center rounded-4"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 16px rgba(92,68,216,0.08)",
                  border: "1px solid rgba(92,68,216,0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(92,68,216,0.15)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(92,68,216,0.08)";
                }}
              >
                {/* ✅ Icon */}
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 56, height: 56,
                    background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                  }}
                >
                  {card.icon?.url ? (
                    <img
                      src={`${STRAPI_URL}${card.icon.url}`}
                      alt={card.tag_label}
                      width={28}
                      height={28}
                      style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }}
                    />
                  ) : (
                    <span style={{ fontSize: 22 }}>
                      {iconFallback[card.tag_label] || " "}
                    </span>
                  )}
                </div>

                {/* ✅ Tag badge */}
                <span
                  className="d-inline-block mb-2 px-3 py-1 rounded-pill"
                  style={{
                    backgroundColor: "rgba(92,68,216,0.1)",
                    color: "#5C44D8",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                  }}
                >
                  {card.tag_label}
                </span>

                {/* Title */}
                <h5 className="fw-bold mb-3">{card.title}</h5>

                {/* Lines */}
                <div className="text-muted">
                  {card.lines.split("\n").map((line, i) => (
                    <p key={i} className="mb-1" style={{ fontSize: "14px" }}>
                      {line}
                    </p>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}