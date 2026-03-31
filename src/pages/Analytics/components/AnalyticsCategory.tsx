import type { ChartDataItem } from "../../../types/types";
import styles from "../analytics.module.css";
import { AnalyticsChart } from "./AnalyticChart";

interface AnalyticsCategoryProps {
  data: ChartDataItem[];
}
export function AnalyticsCategory({ data }: AnalyticsCategoryProps) {
  return (
    <section className={styles.AnalyticsChart}>
      <div>
        <h2 className={styles.AnalyticsChartTitle}>
          Where`s your money going ?
        </h2>
        <AnalyticsChart data={data} />
      </div>
    </section>
  );
}
