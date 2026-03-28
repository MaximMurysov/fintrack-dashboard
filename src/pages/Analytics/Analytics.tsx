import DashboardHeaderAuth from "../Dashboard/DashboardHeaderAuth";
import styles from "./analytics.module.css";
import { useLogin } from "../../hooks/useLogin";
import { AnalyticsChart } from "./components/AnalyticChart";
import { transactions } from "../../data/transactions";
import { prepareChartData } from "./components/PrepareCharData";
import { TopCategories } from "./components/TopCategories";

function Analytics() {
  const { handleLogin, user, hasLogin, setUser, logout } = useLogin();
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  const data = prepareChartData(transactions);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const topCategorie = data.reduce((max, item) =>
    item.value > max.value ? item : max,
  );
  const percent = total ? Math.round((topCategorie.value / total) * 100) : 0;
  const smallest = data.reduce((min, item) =>
    min.value < item.value ? min : item,
  );
  const minPercent = total ? Math.round((smallest.value / total) * 100) : 0;

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <h2>Analytics</h2>
        <DashboardHeaderAuth
          hasLogin={hasLogin}
          userLogin={user}
          setUserLogin={setUser}
          logoutUser={logout}
          handleLogin={handleLogin}
        />
      </div>
      <TopCategories
        total={total}
        topCategorie={topCategorie}
        percent={percent}
        smallest={smallest}
        minPercent={minPercent}
      />
      <section className={styles.AnalyticsChart}>
        <div>
          <h2 className={styles.AnalyticsChartTitle}>
            Where`s your money going ?
          </h2>
          <AnalyticsChart />
        </div>
        <div className={styles.analyticsCategotySection}>
          {data.map((t, index) => {
            const total = data.reduce((sum, item) => sum + item.value, 0);
            const percent = Math.round((t.value / total) * 100);
            return (
              <div className={styles.analyticsCategotyItems}>
                <p
                  className={styles.icon}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></p>
                <p>{t.name}</p>
                <p>{percent} %</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
export default Analytics;
