import type { LoginContextType } from "../../types/types";
import { createContext, useState } from "react";
import type { UserLogin } from "../../types/types";

export const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLogin>({
    name: "",
    password: "",
  });
  const [hasLogin, setHasLogin] = useState<boolean>(false);

  const logout = () => {
    setUser({ name: "", password: "" });
    setHasLogin(false);
  };
  const handleLogin = () => {
    if (!user.name.trim() || !user.password.trim()) return;
    setHasLogin(true);
  };
  return (
    <LoginContext.Provider
      value={{ user, setUser, logout, hasLogin, handleLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};
