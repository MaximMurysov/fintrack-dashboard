import useTransaction from "../../hooks/useTransactions";
import { TransactionsContext } from "./TransactionsContext";

import type { ReactNode } from "react";
type TransactionsProviderProps = {
  children: ReactNode;
};
function TransactionsProvider({ children }: TransactionsProviderProps) {
  const value = useTransaction();
  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}
export default TransactionsProvider;
