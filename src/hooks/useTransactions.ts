import { useState } from "react";
import { transactions } from "../data/transactions";
import type Transactions from "../pages/Transactions/Transactions";
import type { EditableField } from "../types/types";
import type { UserLogin } from "../types/types";
function useTransaction() {
  const [cardTransactions, setCardTransactions] = useState(transactions);
  const [draftValue, setDraftValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<null | EditableField>(null);
  const [hasLogin, setHasLogin] = useState(false);
  const [userLogin, setUserLogin] = useState<UserLogin>({
    name: "",
    password: "",
  });
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleLogin = () => {
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
  return {
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
  };
}
export default useTransaction;
