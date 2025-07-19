import { Link } from "react-router-dom";
import PhoneList from "../../components/PhoneList";
import styles from './PhoneListPage.module.sass';

function PhoneListPage() {
  return (
    <div className={styles.listPage}>
      <Link className={styles.btn} to='/'>Home</Link>
      <h2>Phone List</h2>
      <PhoneList />
    </div>
  )
}

export default PhoneListPage;