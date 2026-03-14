import styles from "./dashboard.module.css";
import { useState, type ReactNode } from "react";
import SpendingChart from "../SpendingChart";
import { transactions, type Transactions } from "../../data/transactions";
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import TransactionsTable from "./TransactionsTable";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  className?: string;
}
export type EditableField = "date" | "description" | "category" | "amount";

function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <p className={styles.value}>$ {value}</p>
      <p className={styles.icon}>{icon}</p>
    </div>
  );
}

function Dashboard() {
  const [cardTransactions, setCardTrasactions] = useState(transactions);
  const [draftValue, setDraftValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<null | EditableField>(null);
  const editTransaction = (t: Transactions, field: EditableField) => {
    setEditId(t.id);
    setEditingField(field);
    setDraftValue(String(t[field]));
  };
  const deleteTransaction = (id: number) => {
    setCardTrasactions(cardTransactions.filter((t) => t.id !== id));
  };
  const saveTransaction = () => {
    if (editId === null || !editingField) return;
    setCardTrasactions(
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

  const totalSum = cardTransactions.reduce(
    (acc, price) => (acc += price.amount),
    0,
  );
  const incomeSum = cardTransactions
    .filter((elem) => elem.amount > 0)
    .reduce((acc, price) => (acc += price.amount), 0);

  const expensesSum = cardTransactions
    .filter((elem) => elem.amount < 0)
    .reduce((acc, price) => (acc += Math.abs(price.amount)), 0);
  const cards = [
    {
      id: 1,
      title: "Total balance",
      value: totalSum,
      icon: <MdAccountBalanceWallet />,
      className: styles.cardTotal,
    },
    {
      id: 2,
      title: "Income",
      value: incomeSum,
      icon: <FaArrowTrendUp />,
      className: styles.cardIncome,
    },
    {
      id: 3,
      title: "Expenses",
      value: expensesSum,
      icon: <FaArrowTrendDown />,
      className: styles.cardExpense,
    },
  ];

  const transactionsTitle = ["Date", "Description", "Category", "Amount"];
  const spendingData = cardTransactions
    .filter((elem) => elem.amount < 0)
    .map((elem) => ({ date: elem.date, amount: Math.abs(elem.amount) }));
  return (
    <>
      <div className={styles.dashboardHeader}>
        <h2>Dashboard</h2>
        <div className={styles.userLogin}>
          <p className={styles.userPhoto}></p>
          <p className={styles.userName}>User User</p>
        </div>
      </div>
      <div className={styles.dashboardCard}>
        {cards.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            className={card.className}
          />
        ))}
      </div>
      <div className={styles.spendingOverview}>
        <div className={styles.spendingOverviewContainer}>
          <h2 className={styles.spendingTitle}>Spending Overview</h2>
          <SpendingChart data={spendingData} />
        </div>
      </div>
      <div className={styles.recentTransactions}>
        <div className={styles.recentTransactionsContainer}>
          <div className={styles.recentHeader}>
            <h2 className={styles.recentTitle}>Recent Transactions</h2>
            <button className={styles.viewAll}>View All</button>
          </div>

          <TransactionsTable
            transactionsTitle={transactionsTitle}
            editId={editId}
            editingField={editingField}
            draftValue={draftValue}
            setDraftValue={setDraftValue}
            saveTransaction={saveTransaction}
            cancelTransaction={cancelTransaction}
            editTransaction={editTransaction}
            deleteTransaction={deleteTransaction}
            cardTransactions={cardTransactions}
          />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
