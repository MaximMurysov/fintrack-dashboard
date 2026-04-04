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
import { useDisplayPreferences } from "../../hooks/useDisplayPreferences";

export function StatCard({ title, value, icon, className }: StatCardProps) {
  const { currencySymbol, formatPositiveAmount } = useDisplayPreferences();
  return (
    <div className={className}>
      <h2>{title}</h2>
      <p className={styles.value}>
        {currencySymbol} {formatPositiveAmount(value)}
      </p>
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
    totalSum,
    incomeSum,
    expensesSum,
    spendingData,
  } = useTransaction();

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
