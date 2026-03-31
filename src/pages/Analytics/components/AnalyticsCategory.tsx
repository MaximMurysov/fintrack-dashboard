import type { ChartDataItem } from "../../../types/types";
import styles from "../analytics.module.css";
import { AnalyticsChart } from "./AnalyticChart";

interface AnalyticsCategoryProps {
  data: ChartDataItem[];
  total: number;
}
export function AnalyticsCategory({ data, total }: AnalyticsCategoryProps) {
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  return (
    <section className={styles.AnalyticsChart}>
      <div>
        <h2 className={styles.AnalyticsChartTitle}>
          Where`s your money going ?
        </h2>
        <AnalyticsChart />
      </div>
      <div className={styles.analyticsCategotySection}>
        {data.map((t, index) => {
          const percent = total ? Math.round((t.value / total) * 100) : 0;
          return (
            <div key={t.name} className={styles.analyticsCategotyItems}>
              <p
                className={styles.icon}
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></p>
              <p>{t.name}</p>
              <p>{percent} %</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
