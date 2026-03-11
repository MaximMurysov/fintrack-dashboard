import styles from "./styles.module.css";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <div>Main Content</div>
    </div>
  );
}

export default App;
