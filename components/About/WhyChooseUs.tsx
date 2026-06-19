import styles from "./WhyChooseUs.module.css";
import { STRAPI_URL } from "@/lib/constants";

export default function WhyChooseUs({ data }: any) {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.description}>{data.description}</p>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {data.cards?.map((card: any) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.icon}>
              {card.icon?.url && (
                <img
                  src={`${STRAPI_URL}${card.icon.url}`}
                  alt={card.title}
                  width={26}
                  height={26}
                />
              )}
            </div>
            <h5 className={styles.cardTitle}>{card.title}</h5>
            <p className={styles.cardDesc}>{card.description}</p>
            <a href={card.link_url?.trim()} className={styles.cardLink}>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}