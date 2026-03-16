import styles from "./transactions.module.css";
import { useState } from "react";
import type { EditableField } from "../Dashoboard/Dashboard";
import TransactionsTable from "../Dashoboard/TransactionsTable";
import { transactions } from "../../data/transactions";
import type { Transactions } from "../../data/transactions";
function Transactions() {
  const [cardTransactions, setCardTransactions] = useState(transactions);
  const [draftValue, setDraftValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<null | EditableField>(null);

  const editTransaction = (t: Transactions, field: EditableField) => {
    setEditId(t.id);
    setEditingField(field);
    setDraftValue(String(t[field]));
  };
  const deleteTransaction = (id: number) => {
    setCardTransactions(cardTransactions.filter((t) => t.id !== id));
  };
  const saveTransaction = () => {
    if (editId === null || !editingField) return;
    setCardTransactions(
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

  const transactionsTitle = ["Date", "Description", "Category", "Amount"];
  return (
    <div className={styles.transactionsHeader}>
      <h2>History transaction</h2>
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
