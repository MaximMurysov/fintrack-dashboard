import { useState } from "react";
import { transactions } from "../data/transactions";
import type { EditableField, TransactionsType } from "../types/types";

function useTransaction() {
  const [cardTransactions, setCardTransactions] = useState(transactions);
  const [draftValue, setDraftValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<null | EditableField>(null);

  const editTransaction = (t: TransactionsType, field: EditableField) => {
    setEditId(t.id);
    setEditingField(field);
    setDraftValue(String(t[field]));
  };
  const deleteTransaction = (id: number) => {
    setCardTransactions(cardTransactions.filter((t) => t.id !== id));
  };
  const saveTransaction = () => {
    if (editId === null || !editingField) return;
    setCardTransactions(
      cardTransactions.map((elem) =>
        elem.id !== editId
          ? elem
          : {
              ...elem,
              [editingField]:
                editingField === "amount" ? Number(draftValue) : draftValue,
            },
      ),
    );
    setEditId(null);
    setDraftValue("");
    setEditingField(null);
  };

  const cancelTransaction = () => {
    setEditId(null);
    setEditingField(null);
    setDraftValue("");
  };

  const stats = cardTransactions.reduce(
    (acc, transaction) => {
      acc.total += transaction.amount;
      
      if (transaction.amount > 0) {
        acc.income += transaction.amount;
      } else {
        acc.expenses += Math.abs(transaction.amount);
        acc.spendingData.push({
          date: transaction.date,
          amount: Math.abs(transaction.amount)
        });
      }
      
      return acc;
    },
    { 
      total: 0, 
      income: 0, 
      expenses: 0,
      spendingData: [] as { date: string; amount: number }[]
    }
  );

  const totalSum = stats.total;
  const incomeSum = stats.income;
  const expensesSum = stats.expenses;
  const spendingData = stats.spendingData;

  return {
    cardTransactions,
    totalSum,
    incomeSum,
    expensesSum,
    spendingData,
    draftValue,
    editId,
    editingField,
    setDraftValue,
    editTransaction,
    deleteTransaction,
    saveTransaction,
    cancelTransaction,
    setCardTransactions,
  };
}
export default useTransaction;
