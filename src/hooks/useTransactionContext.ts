import { useContext } from "react";
import { TransactionsContext } from "../components/TransactionContext/TransactionsContext";
export function useTransaction() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransaction must be used within a LoginProvider");
  }
  return context;
}
