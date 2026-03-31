import styles from "../analytics.module.css";
interface TopCategoriesProps {
  data: {
    name: string;
    value: number;
    color: string;
    percent: number;
  }[];
}

export function TopCategoriesItems({ data }: TopCategoriesProps) {
  return (
    <div className={styles.analyticsCategotySection}>
      {data.map((t) => (
          <div key={t.name} className={styles.analyticsCategotyItems}>
            <p className={styles.icon} style={{ backgroundColor: t.color }}></p>
            <p>{t.name}</p>
            <p>{t.percent} %</p>
          </div>
        ))}
    </div>
  );
}
