import { useContext } from "react";
import { LoginContext } from "../components/LoginContext/LoginContext";

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
