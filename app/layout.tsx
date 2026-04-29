// app/layout.tsx
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

async function getNavbarData() {
  const res = await fetch("http://localhost:1337/api/navbar?populate=*", {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

async function getFooterData() {
  const res = await fetch(
    "http://localhost:1337/api/footer?populate=logo&populate[link_group][populate][link_groups]=*&populate[ContactInfo]=*",
    { cache: "no-store" }
  );
  const json = await res.json();
  console.log("Footer raw JSON:", json); // ← log before return
  return json.data;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navbarData = await getNavbarData();
  const footerData = await getFooterData();
  console.log("Footer data in layout:", footerData); // ← log after await

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar data={navbarData} />
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