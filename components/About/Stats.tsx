import styles from "./Stats.module.css";

const statIcons = [
  "https://img.icons8.com/ios-filled/40/ffffff/student-male.png",
  "https://img.icons8.com/ios-filled/40/ffffff/task-completed.png",
  "https://img.icons8.com/ios-filled/40/ffffff/trophy.png",
];

export default function Stats({ data }: any) {
  return (
    <section className={styles.statsSection}>
      <div className={styles.inner}>

        {/* ── Top Tag ── */}
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>{data.tag_label}</span>
        </div>

        {/* ── Heading ── */}
        <h2 className={styles.heading}>{data.heading}</h2>

        {/* ── Stat Cards ── */}
        <div className={styles.cardsGrid}>
          {data.stats?.map((item: any, index: number) => (
            <div key={item.id} className={styles.cardBox}>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  <img
                    src={statIcons[index]}
                    alt={item.label}
                    width={28}
                    height={28}
                  />
                </div>
                <h3 className={styles.statNumber}>{item.number}</h3>
              </div>
              <h6 className={styles.statLabel}>{item.label}</h6>
              <p className={styles.statDesc}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <hr className={styles.divider} />

        {/* ── Bottom Row ── */}
        <div className={styles.bottomGrid}>
          {data.items?.map((item: any) => (
            <div key={item.id}>
              <h4 className={styles.bottomNumber}>{item.number}</h4>
              <p className={styles.bottomLabel}>{item.lable}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}