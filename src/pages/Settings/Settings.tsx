import DashboardHeaderAuth from "../Dashboard/DashboardHeaderAuth";
import styles from "./settings.module.css";
import { useLogin } from "../../hooks/useLogin";
import {
  useDisplayPreferences,
  type CurrencyCode,
} from "../../hooks/useDisplayPreferences";

function Settings() {
  const { user, setUser, hasLogin, logout, handleLogin } = useLogin();
  const {
    currency,
    setCurrency,
    compactAmounts,
    setCompactAmounts,
  } = useDisplayPreferences();

  return (
    <>
      <div className={styles.settingsHeader}>
        <h2>Settings</h2>
        <DashboardHeaderAuth
          hasLogin={hasLogin}
          userLogin={user}
          setUserLogin={setUser}
          logoutUser={logout}
          handleLogin={handleLogin}
        />
      </div>
      <section className={styles.settingsBody}>
        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Account</h2>
          <p className={styles.cardDescription}>
            Sign in using the login form in the header. Here you can change the
            display name shown in the app after you are signed in.
          </p>
          <div className={styles.fieldGroup}>
            <label
              className={styles.fieldLabel}
              htmlFor="settings-display-name"
            >
              Display name
            </label>
            <input
              id="settings-display-name"
              type="text"
              className={styles.input}
              placeholder={hasLogin ? "Your display name" : "Sign in to edit"}
              value={user.name}
              disabled={!hasLogin}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          {!hasLogin && (
            <p className={styles.muted}>
              You are not signed in. Use the login and password fields in the
              header, then you can edit your display name here.
            </p>
          )}
        </div>

        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Display</h2>
          <p className={styles.cardDescription}>
            These preferences are saved in this browser (localStorage). Amounts
            on Dashboard, Transactions, and Analytics use the selected currency
            symbol; sample data values stay the same.
          </p>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel} htmlFor="settings-currency">
              Currency
            </label>
            <select
              id="settings-currency"
              className={styles.select}
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value as CurrencyCode)
              }
              aria-label="Preferred currency"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div className={styles.toggleRow}>
            <div>
              <span className={styles.toggleLabel}>Compact amounts</span>
              <span className={styles.toggleHint}>
                Use short form for large numbers (e.g. 1.2K) where supported.
              </span>
            </div>
            <button
              type="button"
              className={`${styles.switch} ${compactAmounts ? styles.switchOn : ""}`}
              onClick={() => setCompactAmounts(!compactAmounts)}
              role="switch"
              aria-checked={compactAmounts}
              aria-label="Toggle compact amounts"
            >
              <span className={styles.switchKnob} />
            </button>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Data and about</h2>
          <p className={styles.cardDescription}>
            This demo keeps transactions in React context. Edits survive while
            you navigate, but a full page reload resets them to the initial
            sample data. Login state is kept in memory only until you refresh.
          </p>
          <p className={styles.muted}>
            <span className={styles.badge}>Finance Tracker</span>
            {" "}
            Practice project: track balance, transactions, and category
            analytics built with React and TypeScript.
          </p>
        </div>
      </section>
    </>
  );
}

export default Settings;
