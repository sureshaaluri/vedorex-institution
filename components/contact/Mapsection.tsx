\"use client\";

import { STRAPI_URL } from "@/lib/constants";

interface MapData {
  id: number;
  heading: string;
  map_url: string | null;
  background_image: {
    url: string;
    alternativeText: string | null;
  } | null;
}

export default function Mapsection({ data }: { data: MapData }) {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
            {data.heading}
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "#5C44D8",
              margin: "12px auto 0",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Google Map iframe — shown if map_url exists */}
        {data.map_url && (
          <div className="rounded-4 overflow-hidden shadow">
            <iframe
              src={data.map_url}
              width="100%"
              height="450px"
              allowFullScreen
              loading="lazy"
              style={{ border: 0, display: "block" }}
              title="Google Map"
            />
          </div>
        )}

        {/* Background image — shown below map if exists */}
        {data.background_image?.url && (
          <div className="rounded-4 overflow-hidden shadow mt-4">
            <img
              src={`${STRAPI_URL}${data.background_image.url}`}
              alt={data.background_image.alternativeText || "Map"}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Fallback if both are null */}
        {!data.map_url && !data.background_image?.url && (
          <div
            className="rounded-4 d-flex align-items-center justify-content-center"
            style={{
              height: "400px",
              backgroundColor: "#e9ecef",
              color: "#6c757d",
              fontSize: "16px",
            }}
          >
            📍 Map coming soon
          </div>
        )}

      </div>
    </section>
  );
}