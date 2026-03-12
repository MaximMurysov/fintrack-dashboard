import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
type SpendingPoint = {
  date: string;
  amount: number;
};
type SpendingChartProps = {
  data: SpendingPoint[];
};

function SpendingChart({ data }: SpendingChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          dataKey="amount"
          type="monotone"
          stroke="#3b82f6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SpendingChart;
