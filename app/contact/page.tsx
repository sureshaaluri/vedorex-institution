// app/contact/page.tsx

import type { Metadata } from "next";
import { getContactData } from "@/lib/api";
import Herosection from "@/components/contact/Herosection";
import ContactForm from "@/components/contact/Contactform";
import Mapsection from "@/components/contact/Mapsection";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactData();
  const seo = contact?.SEO; // Note: capitalized field name in Strapi schema (matches About/Courses)

  const metadata: Metadata = {};

  if (seo?.metaTitle) metadata.title = seo.metaTitle;
  if (seo?.metaDescription) metadata.description = seo.metaDescription;
  if (seo?.metaKeywords) metadata.keywords = seo.metaKeywords;

  const imageUrl = seo?.metaImage?.data?.attributes?.url ?? seo?.metaImage?.url;

  if (seo?.metaTitle || seo?.metaDescription || imageUrl) {
    metadata.openGraph = {
      ...(seo?.metaTitle && { title: seo.metaTitle }),
      ...(seo?.metaDescription && { description: seo.metaDescription }),
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    };
  }

  return metadata;
}

export default async function ContactPage() {
  const contact = await getContactData();

  if (!contact || !contact.sections) {
    return <p className="text-center mt-5">No Contact Data Found</p>;
  }

  return (
    <>
      {contact.sections.map((section: any, index: number) => {
        switch (section.__component) {
          case "contact.hero-section":
            return <Herosection key={`hero-${index}`} data={section} />;

          case "contact.contact-form":
            return <ContactForm key={`form-${index}`} data={section} />;

          case "contact.map-section":
            return <Mapsection key={`map-${index}`} data={section} />;

          default:
            return null;
        }
      })}
    </>
  );
}