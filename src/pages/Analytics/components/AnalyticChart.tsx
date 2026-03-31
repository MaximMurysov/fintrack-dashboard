import { PieChart, Pie, Cell, Tooltip } from "recharts";

import type { ChartDataItem } from "../../../types/types";

interface AnalyticsChartProps {
  data: ChartDataItem[];
}
export function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div>
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          innerRadius={120}
          cx="50%"
          cy="50%"
          paddingAngle={2}
          outerRadius={200}
          dataKey="value"
        >
          {data.map((item) => (
            <Cell key={item.name} fill={item.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
