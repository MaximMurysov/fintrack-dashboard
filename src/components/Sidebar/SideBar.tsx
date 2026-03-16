import styles from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import { SiWebmoney } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { MdOutlineReceipt } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdSettings } from "react-icons/md";
function SideBar() {
  return (
    <div className={styles.sideBarSection}>
      <h2 className={styles.sideBarTitle}>
        <SiWebmoney />
        Finance Tracker
      </h2>
      <ul className={styles.sideBarItems}>
        <li>
          <NavLink to="/" className={styles.sideBarItem}>
            <MdDashboard />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions" className={styles.sideBarItem}>
            <MdOutlineReceipt />
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={styles.sideBarItem}>
            <MdBarChart />
            Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={styles.sideBarItem}>
            <MdSettings />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
