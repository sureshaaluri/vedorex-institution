// app/contact/page.tsx

import { getContactData } from "@/lib/api";
import Herosection from "@/components/contact/Herosection";
import ContactForm from "@/components/contact/Contactform";
import Mapsection from "@/components/contact/Mapsection";

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