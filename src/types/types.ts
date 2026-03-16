export type NewTransaction = {
  date: string;
  description: string;
  category: string;
  amount: string;
};
export const transactionsTitle = ["Date", "Description", "Category", "Amount"];
export type EditableField = "date" | "description" | "category" | "amount";

export type Password = string;
export interface UserLogin {
  name: string;
  password: Password;
}
