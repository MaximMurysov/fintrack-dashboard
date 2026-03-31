import styles from "../analytics.module.css";
import { MdShoppingBag } from "react-icons/md";
interface Category {
  name: string;
  value: number;
}
interface TopCategoriesProps {
  total: number;
  topCategory: Category;
  percent: number;
  smallest: Category;
  minPercent: number;
}

export function TopCategories({
  total,
  topCategory,
  percent,
  smallest,
  minPercent,
}: TopCategoriesProps) {
  return (
    <section className={styles.topCategories}>
      <div className={styles.topCategoriesItems}>
        <div className={styles.sectionFirst}>
          <h2>Total spent</h2>
          <p className={styles.total}>$ {total.toLocaleString()}</p>
        </div>
        <p className={styles.line}></p>
        <div className={styles.sectionSecond}>
          <h2>Top category</h2>
          <p className={styles.sectionSecondResult}>
            {topCategory.name}: {percent}%
          </p>
        </div>
      </div>
      <div className={styles.topCategoriesItems}>
        <div className={styles.sectionSecond}>
          <h2>Top category</h2>
          <p className={styles.sectionSecondResult}>
            {topCategory.name}: {percent}%
          </p>
        </div>
        <MdShoppingBag className={styles.logo1} />
      </div>
      <div className={styles.topCategoriesItems}>
        <div className={styles.sectionSecond}>
          <h2>Smallest</h2>
          <p className={styles.sectionSecondResult}>
            {smallest.name}: {minPercent}%
          </p>
        </div>
        <MdShoppingBag className={styles.logo2} />
      </div>
    </section>
  );
}
