import styles from "./Hero.module.css";

export default function Hero({ data }: any) {
  const STRAPI_URL = "http://localhost:1337";
  const imageUrl = data.background_Image?.url;

  return (
    <section
      className={styles.heroSection}
      style={{
        backgroundImage: `url(${STRAPI_URL}${imageUrl})`,
      }}
    >
      {/* Overlay */}
      <div
        className={styles.overlay}
        style={{ background: data.OverlayColor }}
      />

      <div className={`container ${styles.heroContainer}`}>
        <h1 className={styles.heroTitle}>{data.title}</h1>

        <p className={styles.heroDesc}>
          {data.Description}
        </p>

      
      </div>
    </section>
  );
}