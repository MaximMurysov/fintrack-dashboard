import styles from "./dashboard.module.css";
import type { ReactNode } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import SpendingChart from "./SpendingChart";
import { transactions } from "../data/transactions";
interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  className?: string;
}
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
  const totalSum = transactions.reduce(
    (acc, price) => (acc += price.amount),
    0,
  );
  const incomeSum = transactions
    .filter((elem) => elem.amount > 0)
    .reduce((acc, price) => (acc += price.amount), 0);

  const expensesSum = transactions
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
  const spendingData = transactions
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

          <table className={styles.transactionsTable}>
            <thead>
              <tr>
                {transactionsTitle.map((elem) => (
                  <th key={elem}>{elem}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((elem) => (
                <tr key={elem.id}>
                  <td>{elem.date}</td>
                  <td>{elem.description}</td>
                  <td>{elem.category}</td>
                  <td
                    className={
                      elem.amount < 0
                        ? styles.amountNegative
                        : styles.amountPositive
                    }
                  >
                    {elem.amount < 0
                      ? `-$${Math.abs(elem.amount)}`
                      : `+$${elem.amount}`}
                  </td>
                  <td>
                    <button className={styles.linkButton}>Edit</button>
                    <button className={styles.linkButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
