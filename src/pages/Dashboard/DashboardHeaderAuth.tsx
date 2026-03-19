import styles from "./dashboard.module.css";

import type { UserLogin } from "../../types/types";
export interface DashboardHeaderAuthProps {
  hasLogin: boolean;
  userLogin: UserLogin;
  setUserLogin: React.Dispatch<React.SetStateAction<UserLogin>>;
  logoutUser: () => void;
  handleLogin: () => void;
}

function DashboardHeaderAuth({
  hasLogin,
  userLogin,
  setUserLogin,
  logoutUser,
  handleLogin,
}: DashboardHeaderAuthProps) {
  if (!userLogin) return null;
  return (
    <div className={styles.userLogin}>
      {hasLogin ? (
        <>
          <p className={styles.userPhoto}></p>
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
            className={styles.inputValue}
            onChange={(e) =>
              setUserLogin((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="password"
            className={styles.inputValue}
            onChange={(e) =>
              setUserLogin((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <button className={styles.loginBtn} onClick={handleLogin}>
            authorization
          </button>
        </div>
      )}
    </div>
  );
}
export default DashboardHeaderAuth;
