import type { Metadata } from "next";
import { getAboutData } from "@/lib/api";
import Hero from "@/components/About/Hero";
import Edtech from "@/components/About/Edtech";
import Stats from "@/components/About/Stats";
import Mentors from "@/components/About/Mentors";
import WhyChooseUs from "@/components/About/WhyChooseUs";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutData();
  const seo = about?.seo;

  const description =
    seo?.metaDescription ||
    "Learn about Vedorex Academy — our mission, expert mentors, and industry-focused training programs designed to launch your tech career.";

  const title = seo?.metaTitle || "About Us";

  const imageUrl = seo?.metaImage?.data?.attributes?.url ?? seo?.metaImage?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
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