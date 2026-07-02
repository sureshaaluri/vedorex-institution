// app/contact/page.tsx

import type { Metadata } from "next";
import { getContactData } from "@/lib/api";
import Herosection from "@/components/contact/Herosection";
import ContactForm from "@/components/contact/Contactform";
import Mapsection from "@/components/contact/Mapsection";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactData();
  const seo = contact?.seo;

  const description =
    seo?.metaDescription ||
    "Get in touch with Vedorex Academy. Reach out for course enquiries, admissions, or support — we're here to help you start your tech career.";

  const title = seo?.metaTitle || "Contact Us";

  const imageUrl = seo?.metaImage?.data?.attributes?.url ?? seo?.metaImage?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default async function ContactPage() {
  const contact = await getContactData();

  if (!contact || !contact.sections) {
    return <p className="text-center mt-5">No Contact Data Found</p>;
  }

  return (
    <>
      {contact.sections.map((section: any, index: number) => {
        //                              ↑ index add చేయండి
        switch (section.__component) {

          case "contact.hero-section":
            return <Herosection key={`hero-${index}`} data={section} />;
            //                  ↑ unique key

    

  
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