// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nunito } from "next/font/google";
import WelcomePopup from "@/components/WelcomePopup";
import { getPopupData } from "@/lib/getPopupData";
import { API_ENDPOINTS, APP_CONFIG } from "@/lib/constants";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

async function getGlobalData() {
  try {
    const res = await fetch(`${API_ENDPOINTS.GLOBAL}?populate=seo`, {
      cache: APP_CONFIG.apiCacheMode as any,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

// Site-wide fallback metadata, pulled entirely from Strapi's Global
// single type. Any page that defines its own generateMetadata() will
// override this. No `title.template` is used — each page's own title
// is shown as-is when set, avoiding doubled/redundant title strings
// (e.g. "About Us | Vedorex Academy | Vedorex Academy - ...").
// Global's title is only shown on pages that don't set their own.
export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalData();
  const seo = global?.seo;

  const metadata: Metadata = {};

  if (seo?.metaTitle) metadata.title = seo.metaTitle;
  if (seo?.metaDescription) metadata.description = seo.metaDescription;
  if (seo?.metaKeywords) metadata.keywords = seo.metaKeywords;

  // Google Search Console ownership verification (site-wide, since this
  // runs in the root layout and applies to every page including "/").
  metadata.verification = {
    google: "fHcvISBT_0hl-DswqA72JqVBh8jaInHgnO6lHeymxg8",
  };

  return metadata;
}

async function getNavbarData() {
  const res = await fetch(`${API_ENDPOINTS.NAVBAR}?populate=*`, {
    cache: APP_CONFIG.apiCacheMode as any,
  });
  const json = await res.json();
  return json.data;
}

async function getFooterData() {
  const res = await fetch(
    `${API_ENDPOINTS.FOOTER}?populate=logo&populate[link_group][populate][link_groups]=*&populate[ContactInfo]=*`,
    { cache: APP_CONFIG.apiCacheMode as any }
  );
  const json = await res.json();
  return json.data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarData = await getNavbarData();
  const footerData = await getFooterData();
  const popupData = await getPopupData();

  return (
    <html
      lang="en"
      style={{ scrollbarWidth: "thin", scrollbarColor: "transparent transparent" }}
    >
      <body className={nunito.className}>
        <Navbar data={navbarData} />
        <WelcomePopup data={popupData} />
        {children}
        <Footer footerData={footerData} />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}