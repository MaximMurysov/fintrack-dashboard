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
type Password = string;
interface UserLogin {
  name: string;
  password: Password;
}

function Dashboard() {
  const [cardTransactions, setCardTrasactions] = useState(transactions);
  const [draftValue, setDraftValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<null | EditableField>(null);
  const [hasLogin, setHasLogin] = useState(false);
  const [userLogin, setUserLogin] = useState<UserLogin>({
    name: "",
    password: "",
  });
  const handelEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      authorizationUser();
    }
  };
  const authorizationUser = () => {
    if (!userLogin.name.trim() || !userLogin.password.trim()) return;
    setHasLogin(true);
  };
  const logoutUser = () => {
    setHasLogin(false);
    setUserLogin({ name: "", password: "" });
  };
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
          {hasLogin ? (
            <>
              <p className={styles.userName}>{userLogin.name}</p>
              <button onClick={logoutUser} className={styles.loginBtn}>
                logout
              </button>
            </>
          ) : (
            <div>
              <input
                type="text"
                placeholder="login"
                value={userLogin.name}
                onKeyDown={handelEnter}
                className={styles.inputValue}
                onChange={(e) =>
                  setUserLogin((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="password"
                placeholder="password"
                className={styles.inputValue}
                onKeyDown={handelEnter}
                onChange={(e) =>
                  setUserLogin((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <button onClick={authorizationUser} className={styles.loginBtn}>
                authorization
              </button>
            </div>
          )}
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
