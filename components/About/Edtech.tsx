import styles from "./Edtech.module.css";

const BASE_URL = "http://localhost:1337";

const icons = [
  "https://img.icons8.com/ios-filled/50/1e40af/machine-learning.png",
  "https://img.icons8.com/ios-filled/50/1e40af/find-matching-job.png",
  "https://img.icons8.com/ios/50/1e40af/internship.png",
];

export default function Edtech({ data }: any) {
  return (
    <section className={styles.edtechSection}>
      <div className={styles.row}>

        {/* ── LEFT ── */}
        <div className={styles.imageWrapper}>
          <div className={styles.badgeBox}>
            <div className={styles.badgeNumber}>680+</div>
            <div className={styles.badgeText}>Students Trained</div>
          </div>
          <img
            src={`${BASE_URL}${data.section_image?.url}`}
            alt={data.section_image?.alternativeText || "about"}
            className={styles.mainImage}
          />
        </div>

        {/* ── RIGHT ── */}
        <div>
          <span className={styles.tag}>{data.tag_label}</span>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={styles.description}>{data.description}</p>

          <div className={styles.features}>
            {data.features?.map((item: any, index: number) => (
              <div key={item.id} className={styles.featureItem}>
                <div className={styles.iconBox}>
                  <img
                    src={icons[index]}
                    alt={item.title}
                    width={26}
                    height={26}
                  />
                </div>
                <div>
                  <div className={styles.featureTitle}>{item.title}</div>
                  <p className={styles.featureDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}