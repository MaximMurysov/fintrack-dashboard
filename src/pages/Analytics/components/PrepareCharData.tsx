import type { TransactionsType } from "../../../types/types";
export const prepareChartData = (transactions: TransactionsType[]) => {
  const grouped: Record<string, number> = {};

  transactions
    .filter((t) => t.amount < 0)
    .forEach((t) => {
      if (!grouped[t.category]) {
        grouped[t.category] = 0;
      }
      grouped[t.category] += Math.abs(t.amount);
    });
  return Object.entries(grouped).map(([category, value]) => ({
    name: category,
    value,
  }));
};
