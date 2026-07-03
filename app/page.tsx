import type { Metadata } from "next";
import HeroSlider from "@/components/Heroslider";
import CourseHighlight from "@/components/CourseHighlight";
import CTA from "@/components/CTA";
import CourseCategories from "@/components/CourseCategories";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import TopCourses from "@/components/TopCourses";

import { API_ENDPOINTS, APP_CONFIG, STRAPI_URL } from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getHomeData() {
  const res = await fetch(`${API_ENDPOINTS.HOME_PAGE}?populate=seo.metaImage`, {
    cache: APP_CONFIG.apiCacheMode as any,
  });
  const json = await res.json();
  return json.data;
}

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomeData();
  const seo = homeData?.seo;

  const metadata: Metadata = {};

  if (seo?.metaTitle) metadata.title = seo.metaTitle;
  if (seo?.metaDescription) metadata.description = seo.metaDescription;

  const imageUrl = seo?.metaImage?.data?.attributes?.url ?? seo?.metaImage?.url;

  if (seo?.metaTitle || seo?.metaDescription || imageUrl) {
    metadata.openGraph = {
      ...(seo?.metaTitle && { title: seo.metaTitle }),
      ...(seo?.metaDescription && { description: seo.metaDescription }),
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    };
  }

  return metadata;
}

export default async function Home() {
  const homeData = await getHomeData();
  const sections = homeData.sections;

  // Organization JSON-LD — helps Google's Knowledge Panel and rich search results
  // for the site as a whole. Uses the same data already fetched for this page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vedorex Academy",
    url: SITE_URL,
    logo: `${STRAPI_URL}/uploads/logo_svg_removebg_preview_3c8697849e_77cff4a292.png`,
    description:
      homeData?.seo?.metaDescription ??
      "Vedorex Academy offers industry-focused training in Web Development, Programming, Data Science, and AI with hands-on projects, expert mentors, and placement assistance.",
    sameAs: [
      "https://facebook.com",
      "https://instagram.com",
      "https://twitter.com",
      "https://linkedin.com",
      "https://youtube.com",
    ],
  };

  return (
    <main style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {sections.map((section: any) => {
        if (section.__component === "section.hero-slider") {
          return <HeroSlider key={`${section.__component}-${section.id}`} data={section} />;
        }
        if (section.__component === "section.course-highlight") {
          return <CourseHighlight key={`${section.__component}-${section.id}`} data={section} />;
        }
        {
          if (section.__component === "section.cta") {
            return <CTA key={`${section.__component}-${section.id}`} data={section} />;
          }
        }
        if (section.__component === "section.course-categories") {
          return <CourseCategories key={`${section.__component}-${section.id}`} data={section} />;
        }
        if (section.__component === "section.testimonials") {
          return <Testimonials key={`${section.__component}-${section.id}`} data={section} />;
        }
        if (section.__component === "section.why-choose-us") {
          return <WhyChooseUs key={`${section.__component}-${section.id}`} data={section} />;
        }
        if (section.__component === "section.top-courses") {
          return <TopCourses key={`${section.__component}-${section.id}`} data={section} />;
        }

        return null;
      })}
    </main>
  );
}