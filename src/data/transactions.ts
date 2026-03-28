import type { TransactionsType } from "../types/types";

export const transactions: TransactionsType[] = [
  {
    id: 1,
    date: "Mar 08",
    description: "Coffee",
    category: "Food",
    amount: -88,
  },
  {
    id: 2,
    date: "Mar 06",
    description: "Groceries",
    category: "Shopping",
    amount: -555,
  },
  {
    id: 3,
    date: "Mar 02",
    description: "Salary",
    category: "Income",
    amount: 3500,
  },
  {
    id: 4,
    date: "Feb 28",
    description: "Electric Bill",
    category: "Utilities",
    amount: -350,
  },
  {
    id: 5,
    date: "Feb 25",
    description: "Gym Membership",
    category: "Other",
    amount: -450,
  },
  {
    id: 6,
    date: "Feb 20",
    description: "Freelance",
    category: "Income",
    amount: 480,
  },
  {
    id: 7,
    date: "Feb 18",
    description: "Taxi",
    category: "Other",
    amount: -220,
  },
];

export const transactionsTitle = ["Date", "Description", "Category", "Amount"];
