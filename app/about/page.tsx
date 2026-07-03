import type { Metadata } from "next";
import { getAboutData } from "@/lib/api";
import Hero from "@/components/About/Hero";
import Edtech from "@/components/About/Edtech";
import Stats from "@/components/About/Stats";
import Mentors from "@/components/About/Mentors";
import WhyChooseUs from "@/components/About/WhyChooseUs";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutData();
  const seo = about?.SEO; // Note: capitalized field name in Strapi schema

  const metadata: Metadata = {};

  if (seo?.metaTitle) metadata.title = seo.metaTitle;
  if (seo?.metaDescription) metadata.description = seo.metaDescription;
  if (seo?.metaKeywords) metadata.keywords = seo.metaKeywords;

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

export default async function AboutPage() {
  const about = await getAboutData();

  // ✅ Safety check (important)
  if (!about || !about.sections) {
    return <p className="text-center mt-5">No About Data Found</p>;
  }

  return (
    <>
      {about.sections.map((section: any) => {
        switch (section.__component) {
          case "about.hero-section":
            return <Hero key={section.id} data={section} />;

          case "about.edtech-section":
            return <Edtech key={section.id} data={section} />;

          // case "about.stats-section":
          //   return <Stats key={section.id} data={section} />;

          case "about.mentors-section":
            return <Mentors key={section.id} data={section} />;

          case "about.why-choose-us":
            return <WhyChooseUs key={section.id} data={section} />;

          default:
            console.log("Unknown component:", section.__component); // ✅ debug
            return null;
        }
      })}
    </>
  );
} 