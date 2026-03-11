import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
function SideBar() {
  return (
    <div className={styles.sideBarSection}>
      <h2 className={styles.sideBarTitle}>Finance Tracker</h2>
      <ul>
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/transactions">Transactions</NavLink>
        </li>
        <li>
          <NavLink to="/analytics">Analytics</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
