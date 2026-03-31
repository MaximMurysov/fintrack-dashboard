import DashboardHeaderAuth from "../Dashboard/DashboardHeaderAuth";
import styles from "./analytics.module.css";
import { useLogin } from "../../hooks/useLogin";
import { TopCategories } from "./components/TopCategories";
import { AnalyticsCategory } from "./components/AnalyticsCategory";
import { useTopCategory } from "./hooks/useTopCategory";
import { transactions } from "../../data/transactions";
import { AnalyticChartPart2 } from "./components/ExpensesBarChart";
import { TopCategoriesItems } from "./components/TopCategoriesItems";

function Analytics() {
  const { handleLogin, user, hasLogin, setUser, logout } = useLogin();
  const { data, total, topCategory, percent, minPercent, smallest } =
    useTopCategory(transactions);

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
        topCategory={topCategory}
        percent={percent}
        smallest={smallest}
        minPercent={minPercent}
      />
      <section className={styles.analyticsBody}>
        <AnalyticsCategory data={data} />
        <div className={styles.rightColumn}>
          <AnalyticChartPart2 data={data} />
          <TopCategoriesItems data={data} />
        </div>
      </section>
    </div>
  );
}
export default Analytics;
