// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import "./Footer.css";

interface LinkItem {
  id: number;
  label: string;
  url: string;
}

interface LinkGroup {
  id: number;
  label: string;
  link_groups: LinkItem[];
}

interface FooterData {
  description: string;
  copyright: string;
  logo: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  link_group: LinkGroup[];
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Footer({ footerData }: { footerData: FooterData }) {
  if (!footerData) return null;

  const { description, copyright, logo, link_group } = footerData;
  const logoUrl = logo?.url ? `${API_URL}${logo.url}` : null;

  console.log("Logo URL:", logoUrl);

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* ── Left: Logo + Description ── */}
        <div className="footer-left">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="logo"
              style={{ width: 150, height: 50, objectFit: "contain" }}
            />
          )}
          {description && <p>{description}</p>}
        </div>

        {/* ── Link Groups (direct children of grid) ── */}
        {link_group?.map((group) => (
          <div key={group.id} className="footer-link-group">
            <h4 className="footer-link-group__title">{group.label}</h4>
            <ul className="footer-link-group__list">
              {group.link_groups?.map((link) => (
                <li key={link.id}>
                  <Link href={link.url || "#"} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      <hr />
      {copyright && <p className="copyright">{copyright}</p>}
    </footer>
  );
}