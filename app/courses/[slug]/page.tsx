import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { API_ENDPOINTS, STRAPI_URL } from "@/lib/constants";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getCourseBySlug(slug: string) {
  const url = `${API_ENDPOINTS.COURSES}?filters[slug][$eq]=${slug}&populate=*`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();

  return json?.data?.[0] ?? null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params; // Next.js 16 requires awaiting params
  const course = await getCourseBySlug(slug);
  if (!course) return {};

  const seo = course.SEO; // Note: capitalized field, matches Strapi schema for courses
  const metadata: Metadata = {};

  if (seo?.metaTitle) metadata.title = seo.metaTitle;
  if (seo?.metaDescription) metadata.description = seo.metaDescription;
  if (seo?.metaKeywords) metadata.keywords = seo.metaKeywords;

  const imageUrl =
    seo?.metaImage?.data?.attributes?.url ??
    seo?.metaImage?.url ??
    course.thumbnail?.url;

  if (seo?.metaTitle || seo?.metaDescription || imageUrl) {
    metadata.openGraph = {
      ...(seo?.metaTitle && { title: seo.metaTitle }),
      ...(seo?.metaDescription && { description: seo.metaDescription }),
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    };
  }

  return metadata;
}

export default async function CourseDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  // Resolve an absolute image URL for structured data (Strapi returns relative paths)
  const rawImageUrl =
    course.SEO?.metaImage?.data?.attributes?.url ??
    course.SEO?.metaImage?.url ??
    course.thumbnail?.url ??
    null;
  const absoluteImageUrl = rawImageUrl
    ? rawImageUrl.startsWith("http")
      ? rawImageUrl
      : `${STRAPI_URL}${rawImageUrl}`
    : undefined;

  // JSON-LD Course schema — helps Google show rich results (rating, provider, price)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Vedorex Academy",
      sameAs: SITE_URL,
    },
    ...(absoluteImageUrl && { image: absoluteImageUrl }),
    ...(course.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: course.rating,
        ratingCount: course.students || 1,
      },
    }),
    ...(typeof course.price === "number" && {
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: "INR",
        category: course.price === 0 ? "Free" : "Paid",
      },
    }),
  };

  return (
    <div className="Courses-module__mQnfCa__detail" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
      >
        <nav className="Courses-module__mQnfCa__breadcrumb" style={{ padding: 0 }}>
          <span className="Courses-module__mQnfCa__breadcrumbItem">
            <a href="/">Home</a>
          </span>
          <span className="Courses-module__mQnfCa__breadcrumbItem">
            <span className="Courses-module__mQnfCa__breadcrumbSep">›</span>
            <a href="/courses">Courses</a>
          </span>
          <span className="Courses-module__mQnfCa__breadcrumbItem">
            <span className="Courses-module__mQnfCa__breadcrumbSep">›</span>
            <span>{course.title}</span>
          </span>
        </nav>

        <a
          href="/courses"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            color: "#2563eb",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          ← Back to Courses
        </a>
      </div>

      <div className="Courses-module__mQnfCa__detailHeader">
        <span className="Courses-module__mQnfCa__category">{course.category}</span>
        {course.badge && <span className="Courses-module__mQnfCa__badge">{course.badge}</span>}
      </div>

      <h1>{course.title}</h1>
      <p>{course.description}</p>

      {Array.isArray(course.topics) && course.topics.length > 0 && (
        <div style={{ margin: "24px 0" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
            Course Curriculum — {course.topics.length} topics
          </h2>
          {course.topics.map((topic: any, i: number) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#2563eb", margin: "0 0 6px" }}>
                {topic.title}
              </p>
              <p style={{ fontSize: 14, color: "#1a1a2e", lineHeight: 1.6 }}>{topic.content}</p>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 32,
          flexWrap: "wrap",
        }}
      >
        <a
          href="/courses"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            color: "#2563eb",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          ← Back to Courses
        </a>

        <a
          className="Courses-module__mQnfCa__enrollBtn"
          style={{ textDecoration: "none" }}
          href="/contact"
        >
          Enroll Now →
        </a>
      </div>
    </div>
  );
}