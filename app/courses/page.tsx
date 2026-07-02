import type { Metadata } from "next";
import CoursesPage from "@/components/Courses";
import { API_ENDPOINTS } from "@/lib/constants";

export const revalidate = 60;

async function getCoursesPageData() {
  const res = await fetch(`${API_ENDPOINTS.COURSES_PAGE}?populate=*`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await getCoursesPageData();
  const seo = pageRes?.data?.seo;

  const description =
    seo?.metaDescription ||
    "Explore Vedorex Academy's courses in Web Development, Programming, Data Science, and AI — hands-on training with expert mentors and placement support.";

  const title = seo?.metaTitle || "Courses";

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

export default async function CoursesPageRoute() {
  const [pageRes, coursesRes] = await Promise.all([
    getCoursesPageData(),

    fetch(`${API_ENDPOINTS.COURSES}?populate=*`, {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
  ]);

  return <CoursesPage hero={pageRes.data} courses={coursesRes.data} />;
}