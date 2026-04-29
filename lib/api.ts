// lib/api.ts

export async function getAboutData() {
  const res = await fetch(
    "http://localhost:1337/api/about-page?" +
    "populate[sections][on][about.why-choose-us][populate][cards][populate]=icon&" +
    "populate[sections][on][about.hero-section][populate]=*&" +
    "populate[sections][on][about.edtech-section][populate]=*&" +
    "populate[sections][on][about.stats-section][populate]=*&" +
    "populate[sections][on][about.mentors-section][populate][mentors][populate]=image&" +
    "populate[sections][on][about.mentors-section][populate][main_image][populate]=*",
    {
      cache: "no-store",
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
    "http://localhost:1337/api/contact-page?populate[sections][populate]=*",
    
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Contact Data");
  }

  const json = await res.json();
  return json.data;
}
