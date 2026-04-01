import type { TransactionsType } from "../../../types/types";
import { prepareChartData } from "../components/PrepareCharData";

export function useTopCategory(transactions: TransactionsType[]) {
  const data = prepareChartData(transactions);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const chartData = data.map((item) => ({
    ...item,
    percent: total ? Math.round((item.value / total) * 100) : 0,
  }));
  if (chartData.length === 0) {
    const emptyCategory = {
      name: "No data",
      value: 0,
      color: "#ccc",
      percent: 0,
    };
    return {
      data: [],
      total: 0,
      topCategory: emptyCategory,
      smallest: emptyCategory,
      percent: 0,
      minPercent: 0,
    };
  }
  const topCategory = chartData.reduce((max, item) =>
    item.value > max.value ? item : max,
  );
  const smallest = chartData.reduce((min, item) =>
    min.value < item.value ? min : item,
  );

  const percent = topCategory.percent || 0;
  const minPercent = smallest.percent || 0;

  return { data: chartData, total, topCategory, smallest, percent, minPercent };
}
