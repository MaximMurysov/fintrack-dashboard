import styles from "./transactions.module.css";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../components/LoginContext/LoginContext";
import TransactionsTable from "../Dashboard/TransactionsTable";
import DashboardHeaderAuth from "../Dashboard/DashboardHeaderAuth";
import { transactionsTitle } from "../../data/transactions";
import type { NewTransaction } from "../../types/types";

import { TransactionsContext } from "../../components/TransactionContext/TransactionsContext";

function Transactions() {
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    date: "",
    description: "",
    category: "",
    amount: "",
  });
  const transactionFields = [
    "date",
    "description",
    "category",
    "amount",
  ] as const;
  const handleAddTransaction = () => {
    if (
      !newTransaction.date.trim() ||
      !newTransaction.description.trim() ||
      !newTransaction.category.trim() ||
      !newTransaction.amount.trim()
    )
      return;
    const newId = Math.max(...cardTransactions.map((t) => t.id)) + 1;
    const addNewTransaction = {
      id: newId,
      date: newTransaction.date,
      description: newTransaction.description,
      category: newTransaction.category,
      amount: Number(newTransaction.amount),
    };
    setCardTransactions([addNewTransaction, ...cardTransactions]);
    setNewTransaction({ date: "", description: "", category: "", amount: "" });
  };

  const context = useContext(LoginContext);
  const transactionContext = useContext(TransactionsContext);
  if (!context || !transactionContext) return null;
  const { user, setUser, hasLogin, logout, handleLogin } = context;
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
    setCardTransactions,
  } = transactionContext;
  return (
    <div>
      <div className={styles.transactionsHeader}>
        <h2 className={styles.transactionsTitle}>Transaction</h2>
        <DashboardHeaderAuth
          hasLogin={hasLogin}
          userLogin={user}
          setUserLogin={setUser}
          logoutUser={logout}
          handleLogin={handleLogin}
        />
      </div>

      <div className={styles.addTransaction}>
        <h1>Transaction</h1>
        <div className={styles.inputValues}>
          {transactionFields.map((elem) => (
            <input
              type="text"
              placeholder={elem}
              className={styles.inputValue}
              value={newTransaction[elem]}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, [elem]: e.target.value })
              }
            />
          ))}
        </div>
        <button className={styles.addBtn} onClick={handleAddTransaction}>
          Add transaction
        </button>
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
    </div>
  );
}
export default Transactions;
