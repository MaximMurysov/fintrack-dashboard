import type useTransaction from "../hooks/useTransactions";
import type { ReactNode } from "react";
export interface NewTransaction {
  date: string;
  description: string;
  category: string;
  amount: string;
}
export interface TransactionsType {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  color?: string;
}

export type EditableField = "date" | "description" | "category" | "amount";

export type Password = string;
export interface UserLogin {
  name: string;
  password: Password;
}

export type LoginContextType = {
  user: UserLogin;
  setUser: React.Dispatch<React.SetStateAction<UserLogin>>;
  hasLogin: boolean;
  logout: () => void;
  handleLogin: () => void;
};
export type TransactionsContextType = ReturnType<typeof useTransaction>;

export interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  className?: string;
}
export type AnalyticContextType = {
  prepareChartData: (arr: TransactionsType[]) => void;
};
export type ChartDataItem = {
  name: string;
  value: number;
  color: string;
};
