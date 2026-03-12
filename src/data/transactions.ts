export interface Transactions {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}
export const transactions: Transactions[] = [
  {
    id: 1,
    date: "Mar 08",
    description: "Coffee",
    category: "Food",
    amount: -8,
  },
  {
    id: 2,
    date: "Mar 06",
    description: "Groceries",
    category: "Shopping",
    amount: -95,
  },
  {
    id: 3,
    date: "Mar 02",
    description: "Salary",
    category: "Income",
    amount: 2100,
  },
  {
    id: 4,
    date: "Feb 28",
    description: "Electric Bill",
    category: "Utilities",
    amount: -150,
  },
  {
    id: 5,
    date: "Feb 25",
    description: "Gym Membership",
    category: "Health",
    amount: -45,
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
    category: "Transport",
    amount: -22,
  },
];
