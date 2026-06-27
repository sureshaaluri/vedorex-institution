import { STRAPI_URL } from "@/lib/constants";
import CoursesPage from "@/components/Courses";

export const revalidate = 60;

// ✅ Add this — metadata for Google
export async function generateMetadata() {
  const res = await fetch(`${STRAPI_URL}/api/courses-page?populate=seo`, {
    next: { revalidate: 60 },
  });
  const { data } = await res.json();
  const seo = data?.seo;

  return {
    title: seo?.metaTitle || "Python Courses – Vedorex",
    description: seo?.metaDescription || "Learn Python, Data Science, Machine Learning and Deep Learning with Vedorex. 1000+ students across South India.",
    openGraph: {
      title: seo?.metaTitle || "Python Courses – Vedorex",
      description: seo?.metaDescription,
      images: seo?.ogImage?.url
        ? [`${STRAPI_URL}${seo.ogImage.url}`]
        : [],
    },
  };
}

// ✅ Your existing code — no change needed
export default async function CoursesClient() {
  const [pageRes, coursesRes] = await Promise.all([
    fetch(`${STRAPI_URL}/api/courses-page?populate=deep`, {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
    fetch(
      `${STRAPI_URL}/api/coursespages?populate=*`,
      { next: { revalidate: 60 } }
    ).then((r) => r.json()),
  ]);

  return (<CoursesPage hero={pageRes.data} courses={coursesRes.data} />);
}
