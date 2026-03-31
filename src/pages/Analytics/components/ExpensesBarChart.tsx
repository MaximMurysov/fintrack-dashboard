import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import styles from "../analytics.module.css";
import type { ChartDataItem } from "../../../types/types";

interface Props {
  data: ChartDataItem[];
}

export function AnalyticChartPart2({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  return (
    <div className={styles.analyticBar}>
      <h2 className={styles.analyticBarTitle}>Spending by category</h2>
      <BarChart width={600} height={300} data={sorted}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value">
          {sorted.map((item) => (
            <Cell key={item.name} fill={item.color} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
