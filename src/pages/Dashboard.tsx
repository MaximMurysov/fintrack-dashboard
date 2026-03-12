import styles from "./dashboard.module.css";
import { useState, type ReactNode } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import SpendingChart from "./SpendingChart";
import { transactions, type Transactions } from "../data/transactions";
import { MdOutlineEdit } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import { MdCancelPresentation } from "react-icons/md";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  className?: string;
}
type EditableField = "date" | "description" | "category" | "amount";

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

          <table className={styles.transactionsTable}>
            <thead>
              <tr>
                {transactionsTitle.map((elem) => (
                  <th key={elem}>{elem}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cardTransactions.map((elem) => {
                const isEditingDescription =
                  editId === elem.id && editingField === "description";
                const isEditingDate =
                  editId === elem.id && editingField === "date";
                const isEditingCategory =
                  editId === elem.id && editingField === "category";
                const isEditingAmount =
                  editId === elem.id && editingField === "amount";
                return (
                  <tr key={elem.id}>
                    <td>
                      {isEditingDate ? (
                        <>
                          <input
                            type="text"
                            value={draftValue}
                            onChange={(e) => setDraftValue(e.target.value)}
                          />
                          <button
                            onClick={saveTransaction}
                            className={styles.save}
                          >
                            <ImCheckmark />
                          </button>
                          <button
                            className={styles.cancel}
                            onClick={cancelTransaction}
                          >
                            <MdCancelPresentation />
                          </button>
                        </>
                      ) : (
                        <>
                          {elem.date}
                          <button
                            className={styles.edit}
                            onClick={() => editTransaction(elem, "date")}
                          >
                            <MdOutlineEdit />
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      {isEditingDescription ? (
                        <>
                          <input
                            type="text"
                            value={draftValue}
                            onChange={(e) => setDraftValue(e.target.value)}
                          />
                          <button
                            className={styles.save}
                            onClick={saveTransaction}
                          >
                            <ImCheckmark />
                          </button>
                          <button
                            onClick={cancelTransaction}
                            className={styles.cancel}
                          >
                            <MdCancelPresentation />
                          </button>
                        </>
                      ) : (
                        <>
                          {elem.description}
                          <button
                            className={styles.edit}
                            onClick={() => editTransaction(elem, "description")}
                          >
                            <MdOutlineEdit />
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      {isEditingCategory ? (
                        <>
                          <input
                            type="text"
                            value={draftValue}
                            onChange={(e) => setDraftValue(e.target.value)}
                          />
                          <button
                            className={styles.save}
                            onClick={saveTransaction}
                          >
                            <ImCheckmark />
                          </button>
                          <button
                            onClick={cancelTransaction}
                            className={styles.cancel}
                          >
                            <MdCancelPresentation />
                          </button>
                        </>
                      ) : (
                        <>
                          {elem.category}
                          <button
                            className={styles.edit}
                            onClick={() => editTransaction(elem, "category")}
                          >
                            <MdOutlineEdit />
                          </button>
                        </>
                      )}
                    </td>
                    <td
                      className={
                        elem.amount < 0
                          ? styles.amountNegative
                          : styles.amountPositive
                      }
                    >
                      {isEditingAmount ? (
                        <>
                          <input
                            type="text"
                            value={draftValue}
                            onChange={(e) => setDraftValue(e.target.value)}
                          />
                          <button
                            className={styles.save}
                            onClick={saveTransaction}
                          >
                            <ImCheckmark />
                          </button>
                          <button
                            onClick={cancelTransaction}
                            className={styles.cancel}
                          >
                            <MdCancelPresentation />
                          </button>
                        </>
                      ) : (
                        <>
                          {elem.amount > 0
                            ? `$${elem.amount}`
                            : `-$${Math.abs(elem.amount)}`}
                          <button
                            className={styles.edit}
                            onClick={() => editTransaction(elem, "amount")}
                          >
                            <MdOutlineEdit />
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      <button
                        className={styles.deleteTransaction}
                        onClick={() => deleteTransaction(elem.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
