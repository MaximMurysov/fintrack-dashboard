import type useTransaction from "../hooks/useTransactions";

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
