import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { transactions } from "../../../data/transactions";
import { prepareChartData } from "./PrepareCharData";
const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

export function AnalyticsChart() {
  const data = prepareChartData(transactions);

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
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
