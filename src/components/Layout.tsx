import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import styles from "../styles.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
