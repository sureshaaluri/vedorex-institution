import styles from "./Mentors.module.css";
import { STRAPI_URL } from "@/lib/constants";

interface MentorData {
  heading: string;
  description: string;
  button_text: string;
  button_url: string;
  mentors?: {
    id: number;
    name: string;
    image?: { url: string; alternativeText?: string | null } | null;
  }[];
  main_image?: { url: string; alternativeText?: string | null } | null;
}

export default function Mentors({ data }: { data: MentorData }) {
  return (
    <section className={`py-5 ${styles.mentorsSection}`}>
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT */}
          <div className="col-12 col-md-6">

            <h2 className={`${styles.heading} mb-3`}>
              {data.heading}
            </h2>

            <p className={`text-muted mb-4 ${styles.description}`}>
              {data.description}
            </p>

            {/* Mentor Cards */}
            <div className="d-flex gap-4 mb-2 mt-5">
              {data.mentors?.map((mentorData: any) => (
                <div key={mentorData.id} className={styles.card}>

                  {mentorData.image?.url ? (
                    <img
                      src={`${STRAPI_URL}${mentorData.image.url}`}
                      alt={
                        mentorData.image?.alternativeText ||
                        mentorData.name
                      }
                      className={styles.cardImg}
                    />
                  ) : (
                    <div className={styles.placeholder}>👤</div>
                  )}

                  <div className={styles.cardName}>
                    {mentorData.name}
                  </div>

                </div>
              ))}
            </div>

            {/* Button */}
            <a
              href={data.button_url}
              className={`btn text-white fw-semibold ${styles.btnCustom}`}
            >
              {data.button_text}
            </a>

          </div>

          {/* RIGHT */}
          <div className="col-12 col-md-6">

            {data.main_image?.url ? (
              <img
                src={`${STRAPI_URL}${data.main_image.url}`}
                alt={data.main_image?.alternativeText || "Mentors"}
                className={`img-fluid rounded-4 shadow ${styles.mainImage}`}
              />
            ) : (
              <div className={`rounded-4 ${styles.noImage}`}>
                No Image Found
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}