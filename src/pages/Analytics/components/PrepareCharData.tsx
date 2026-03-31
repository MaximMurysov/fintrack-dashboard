import type { TransactionsType } from "../../../types/types";
export const prepareChartData = (transactions: TransactionsType[]) => {
  const grouped: Record<string, { value: number; color: string }> = {};

  transactions
    .filter((t) => t.amount < 0)
    .forEach((t) => {
      if (!grouped[t.category]) {
        grouped[t.category] = {
          value: 0,
          color: t.color || "#ccc",
        };
      }

      grouped[t.category].value += Math.abs(t.amount);
    });

  return Object.entries(grouped).map(([category, data]) => ({
    name: category,
    value: data.value,
    color: data.color,
  }));
};
