import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar/SideBar";
import styles from "../styles.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
