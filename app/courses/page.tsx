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

export default async function CoursesPageRoute() {
  const [pageRes, coursesRes] = await Promise.all([
    getCoursesPageData(),

    fetch(`${API_ENDPOINTS.COURSES}?populate=*`, {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
  ]);

  return <CoursesPage hero={pageRes.data} courses={coursesRes.data} />;
}