import styles from "./dashboard.module.css";
import SpendingChart from "./SpendingChart";
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import TransactionsTable from "./TransactionsTable";
import DashboardHeaderAuth from "./DashboardHeaderAuth";
import { transactionsTitle } from "../../data/transactions";
import type { StatCardProps } from "../../types/types";

import { useLogin } from "../../hooks/useLogin";
import { useTransaction } from "../../hooks/useTransactionContext";

export function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <p className={styles.value}>$ {value}</p>
      <p className={styles.icon}>{icon}</p>
    </div>
  );
}

function Dashboard() {
  const { user, setUser, hasLogin, logout, handleLogin } = useLogin();
  const {
    cardTransactions,
    draftValue,
    editId,
    editingField,
    setDraftValue,
    editTransaction,
    deleteTransaction,
    saveTransaction,
    cancelTransaction,
  } = useTransaction();

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

  const spendingData = cardTransactions
    .filter((elem) => elem.amount < 0)
    .map((elem) => ({ date: elem.date, amount: Math.abs(elem.amount) }));

  return (
    <>
      <div className={styles.dashboardHeader}>
        <h2>Dashboard</h2>
        <DashboardHeaderAuth
          hasLogin={hasLogin}
          userLogin={user}
          setUserLogin={setUser}
          logoutUser={logout}
          handleLogin={handleLogin}
        />
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
