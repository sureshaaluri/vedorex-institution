import HeroSlider from "@/components/Heroslider";
import CourseHighlight from "@/components/CourseHighlight";
import CTA from "@/components/CTA";
import CourseCategories from "@/components/CourseCategories";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs"; 
import TopCourses from "@/components/TopCourses";


import { API_ENDPOINTS, APP_CONFIG } from "@/lib/constants";

async function getHomeData() {
  const res = await fetch(API_ENDPOINTS.HOME_PAGE, {
    cache: APP_CONFIG.apiCacheMode as any,
  });
  const json = await res.json();
  return json.data.sections;
}

export default async function Home() {
  const sections = await getHomeData();

  return (
    <main style={{ minHeight: "100vh" }}>
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