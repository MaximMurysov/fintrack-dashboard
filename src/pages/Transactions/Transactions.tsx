import styles from "./transactions.module.css";
import { useState } from "react";
import TransactionsTable from "../Dashboard/TransactionsTable";
import type { Transactions } from "../../data/transactions";
import DashboardHeaderAuth from "../Dashboard/DashboardHeaderAuth";

import type { NewTransaction } from "../../types/types";
import useTransactions from "../../hooks/useTransactions";
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
  const {
    cardTransactions,
    userLogin,
    draftValue,
    editId,
    editingField,
    hasLogin,
    setDraftValue,
    editTransaction,
    deleteTransaction,
    saveTransaction,
    cancelTransaction,
    setCardTransactions,
    setUserLogin,
    handleEnter,
    handleLogin,
    logoutUser,
  } = useTransactions();

  const transactionsTitle = ["Date", "Description", "Category", "Amount"];

  return (
    <div>
      <div className={styles.transactionsHeader}>
        <h2 className={styles.transactionsTitle}>Transaction</h2>
        <DashboardHeaderAuth
          hasLogin={hasLogin}
          userLogin={userLogin}
          handleEnter={handleEnter}
          setUserLogin={setUserLogin}
          handleLogin={handleLogin}
          logoutUser={logoutUser}
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
  );
}
export default Transactions;
