import styles from "./dashboard.module.css";
import { MdOutlineEdit } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import { MdCancelPresentation } from "react-icons/md";
import type { EditableField } from "./Dashboard";
import type { Transactions } from "../../data/transactions";
interface TransactionsTableProps {
  transactionsTitle: string[];
  editId: null | number;
  editingField: null | EditableField;
  draftValue: string;
  setDraftValue: (e: string) => void;
  saveTransaction: () => void;
  cancelTransaction: () => void;
  editTransaction: (t: Transactions, field: EditableField) => void;
  deleteTransaction: (id: number) => void;
  cardTransactions: Transactions[];
}

function TransactionsTable({
  transactionsTitle,
  editId,
  editingField,
  draftValue,
  setDraftValue,
  saveTransaction,
  cancelTransaction,
  editTransaction,
  deleteTransaction,
  cardTransactions,
}: TransactionsTableProps) {
  return (
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
          const isEditingDate = editId === elem.id && editingField === "date";
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
                    <button onClick={saveTransaction} className={styles.save}>
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
                    <button className={styles.save} onClick={saveTransaction}>
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
                    <button className={styles.save} onClick={saveTransaction}>
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
                    <button className={styles.save} onClick={saveTransaction}>
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
  );
}
export default TransactionsTable;
