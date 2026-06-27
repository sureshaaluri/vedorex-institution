import CoursesPage from "@/components/Courses";
import { API_ENDPOINTS } from "@/lib/constants";

export const revalidate = 60;

export default async function CoursesPageRoute() {
  const [pageRes, coursesRes] = await Promise.all([
    fetch(`${API_ENDPOINTS.COURSES_PAGE}?populate=*`, {
      next: { revalidate: 60 },
    }).then((r) => r.json()),

    fetch(`${API_ENDPOINTS.COURSES}?populate=*`, {
      next: { revalidate: 60 },
    }).then((r) => r.json()),
  ]);

  return <CoursesPage hero={pageRes.data} courses={coursesRes.data} />;
} 