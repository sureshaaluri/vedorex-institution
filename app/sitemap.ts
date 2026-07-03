// app/sitemap.ts
import type { MetadataRoute } from "next";
import { API_ENDPOINTS } from "@/lib/constants";

// Set this in .env.local — e.g. NEXT_PUBLIC_SITE_URL=https://www.vedorex.com
// Falls back to localhost for local dev so the sitemap still renders without errors.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getAllCourseSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const url = `${API_ENDPOINTS.COURSES}?fields[0]=slug&fields[1]=updatedAt`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data ?? [])
      .filter((c: any) => c?.slug)
      .map((c: any) => ({ slug: c.slug, updatedAt: c.updatedAt }));
  } catch {
    // If Strapi is unreachable at build time, don't fail the whole sitemap —
    // just return an empty list of course entries.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getAllCourseSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];
}