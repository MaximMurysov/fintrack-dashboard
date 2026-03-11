import styles from "./dashboard.module.css";
import { useState } from "react";
interface StatCardProps {
  title: string;
  value: number;
  className?: string;
}
function StatCard({ title, value, className }: StatCardProps) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <p>$ {value}</p>
    </div>
  );
}
function Dashboard() {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const cards = [
    {
      id: 1,
      title: "Total balance",
      value: totalBalance,
      className: styles.cardTotal,
    },
    { id: 2, title: "Income", value: income, className: styles.cardIncome },
    {
      id: 3,
      title: "Expenses",
      value: expenses,
      className: styles.cardExpense,
    },
  ];

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
            className={card.className}
          />
        ))}
      </div>
    </>
  );
}
export default Dashboard;
