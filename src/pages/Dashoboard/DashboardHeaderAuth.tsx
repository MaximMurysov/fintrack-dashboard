import styles from "./dashboard.module.css";

import type { UserLogin } from "./Dashboard";
interface DashboardHeaderAuthProps {
  hasLogin: boolean;
  userLogin: UserLogin;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setUserLogin: React.Dispatch<React.SetStateAction<UserLogin>>;
  handleLogin: () => void;
  logoutUser: () => void;
}

function DashboardHeaderAuth({
  hasLogin,
  userLogin,
  handleEnter,
  setUserLogin,
  handleLogin,
  logoutUser,
}: DashboardHeaderAuthProps) {
  return (
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
            onKeyDown={handleEnter}
            className={styles.inputValue}
            onChange={(e) =>
              setUserLogin((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="password"
            className={styles.inputValue}
            onKeyDown={handleEnter}
            onChange={(e) =>
              setUserLogin((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <button onClick={handleLogin} className={styles.loginBtn}>
            authorization
          </button>
        </div>
      )}
    </div>
  );
}
export default DashboardHeaderAuth;
