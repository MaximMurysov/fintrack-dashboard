import { createContext } from "react";
import type { TransactionsContextType } from "../../types/types";
export const TransactionsContext =
  createContext<TransactionsContextType | null>(null);
