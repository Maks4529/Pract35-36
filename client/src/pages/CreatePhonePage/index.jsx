import { Link } from "react-router-dom";
import PhoneForm from "../../components/PhoneForm";
import styles from './CreatePhonePage.module.sass';

function CreatePhonePage() {
  return (
    <div className={styles.createPage}>
      <Link className={styles.btn} to='/'>Home</Link>
      <h2>Add new phone</h2>
      <PhoneForm />
    </div>
  )
}

export default CreatePhonePage;