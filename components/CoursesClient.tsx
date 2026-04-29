import CoursesPage from "@/components/CoursesPage";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const revalidate = 60;

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

  return <CoursesPage hero={pageRes.data} courses={coursesRes.data} />;
}