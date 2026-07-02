// app/layout.tsx
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nunito } from "next/font/google";
import WelcomePopup from "@/components/WelcomePopup";
import { getPopupData } from "@/lib/getPopupData";
import { API_ENDPOINTS, APP_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Vedorex Academy",
    template: "%s | Vedorex Academy",
  },
  description:
    "Vedorex Academy offers industry-focused training in Web Development, Programming, Data Science, and AI with hands-on projects, expert mentors, placement assistance.",
};

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
  console.log("popupdata", popupData); // ← log after await

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