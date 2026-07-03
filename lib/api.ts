// lib/api.ts
import { API_ENDPOINTS, APP_CONFIG } from "./constants";

export async function getAboutData() {
  const res = await fetch(
    API_ENDPOINTS.ABOUT_PAGE + "?" +
    "populate[sections][on][about.why-choose-us][populate][cards][populate]=icon&" +
    "populate[sections][on][about.hero-section][populate]=*&" +
    "populate[sections][on][about.edtech-section][populate]=*&" +
    "populate[sections][on][about.stats-section][populate]=*&" +
    "populate[sections][on][about.mentors-section][populate][mentors][populate]=image&" +
    "populate[sections][on][about.mentors-section][populate][main_image][populate]=*&" +
    "populate[SEO][populate]=*",
    {
      cache: APP_CONFIG.apiCacheMode as any,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch About Data");
  }
  const json = await res.json();
  return json.data;
}

export async function getContactData() {
  const res = await fetch(
    `${API_ENDPOINTS.CONTACT_PAGE}?populate[sections][populate]=*&populate[SEO][populate]=*`,
    {
      cache: APP_CONFIG.apiCacheMode as any,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Contact Data");
  }
  const json = await res.json();
  return json.data;
}