import type { TransactionsType } from "../../../types/types";
import { prepareChartData } from "../components/PrepareCharData";

export function useTopCategory(transactions: TransactionsType[]) {
  const data = prepareChartData(transactions);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const topCategory = data.reduce((max, item) =>
    item.value > max.value ? item : max,
  );
  const percent = total ? Math.round((topCategory.value / total) * 100) : 0;
  const smallest = data.reduce((min, item) =>
    min.value < item.value ? min : item,
  );
  const minPercent = total ? Math.round((smallest.value / total) * 100) : 0;

  return { data, total, topCategory, smallest, percent, minPercent };
}
