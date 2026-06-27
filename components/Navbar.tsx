"use client"; // keep this only for scroll effect

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { STRAPI_URL } from "@/lib/constants";

interface NavLink {
  id: number;
  label: string;
  url: string;
  isButton: boolean;
}

interface Logo {
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
}

interface NavbarData {
  logo: Logo;
  nav_links: NavLink[];
}

export default function Navbar({ data }: { data: NavbarData }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();


  const navbarTogglerRef = useRef<HTMLButtonElement>(null);
  const navbarCollapseRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    if (navbarCollapseRef.current?.classList.contains("show")) {
      navbarTogglerRef.current?.click();
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const normalizeUrl = (url: string) => {
    if (!url) return "/";

    const clean = url.trim().toLowerCase();

    const routeMap: any = {
      "/home-page": "/",
      "/about-us": "/about",
      "/contact-us": "/contact",
      "/courses": "/courses",
    };

    return routeMap[clean] || clean;
  };

  if (!data) return null;

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${scrolled ? "shadow" : ""}`}
      style={{ transition: "box-shadow 0.3s ease", backgroundColor: "#F8F6FF" }}
    >
      <div
        className="container-fluid"
        style={{
          padding: "0 clamp(10px, 4vw, 50px)",
          maxWidth: "1920px",
          maxHeight: "55px",
          backgroundColor: "#F8F6FF",
        }}
      >
        {/* Logo */}
        <Link href="/" className="navbar-brand" onClick={closeMenu}>
          {data.logo?.url && (
            <img
              src={`${STRAPI_URL}${data.logo.url}`}
              alt={data.logo.alternativeText || "Logo"}
              style={{ width: "120px", height: "60px", objectFit: "contain", paddingBottom: "10px" }}
            />
          )}
        </Link>

        {/* Mobile Toggle */}
        <button
          ref={navbarTogglerRef}
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ paddingBottom: "10px" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div ref={navbarCollapseRef} className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav ms-auto align-items-center"
            style={{ gap: "8px", backgroundColor: "#F8F6FF", borderRadius: "10px", padding: "10px" }}
          >
            {data.nav_links?.map((link) => {
              console.log("URL:", link.url);
              console.log("Normalized:", normalizeUrl(link.url));

              return (
                <li className="nav-item" key={link.id}>
                  {link.isButton ? (
                    <Link
                      href={link.url ? normalizeUrl(link.url) : "#"}
                      className="btn rounded-pill text-white px-4 py-2"
                      style={{
                        background: "#547cd3",
                        border: "none",
                        transition: "background 0.2s ease, transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#3a5fb5";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#547cd3";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                      }}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ) : (() => {
                    const normalized = normalizeUrl(link.url);
                    // For Next.js, pathname might not exactly match our custom app routes strictly without trailing slashes, but usually it does.
                    // We check if it starts with the normalized url excluding '/' when normalized is not '/', or exactly '/'
                    const isCurrentPage = normalized === "/" ? pathname === "/" : pathname.startsWith(normalized);
                    return (
                      <Link
                        href={normalized}
                        className="nav-link px-4 py-2"
                        style={{
                          color: isCurrentPage ? "#ffffff" : "#4B5563",
                          backgroundColor: isCurrentPage ? "#547cd3" : "transparent",
                          fontWeight: isCurrentPage ? "600" : "500",
                          borderRadius: "50px",
                          transition: "all 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          if (!isCurrentPage) {
                            (e.currentTarget as HTMLAnchorElement).style.color = "#547cd3";
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#f3f4f6";
                          } else {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#3a5fb5";
                            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isCurrentPage) {
                            (e.currentTarget as HTMLAnchorElement).style.color = "#4B5563";
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                          } else {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#547cd3";
                            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                          }
                        }}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    );
                  })()}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
