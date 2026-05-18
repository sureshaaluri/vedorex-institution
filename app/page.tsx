import HeroSlider from "@/components/Heroslider";
import CourseHighlight from "@/components/CourseHighlight";
import CTA from "@/components/CTA";
import CourseCategories from "@/components/CourseCategories";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import TopCourses from "@/components/TopCourses";


async function getHomeData() {
  const res = await fetch("http://localhost:1337/api/home-page", {
    cache: "no-store",
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