import { Link } from "react-router-dom";
import styles from './HomePage.module.sass';

function HomePage () {
  return (
    <div className={styles.homePage}>
      <h1>Phone database</h1>
      <nav className={styles.navMenu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link className={styles.btn} to='/create'>Create phone</Link>
          </li>
          <li className={styles.menuItem}>
            <Link className={styles.btn} to='/phones'>Phones</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.text}>Search for the desired phone model and add new devices to the database</p>
    </div>
  )
}

export default HomePage;
