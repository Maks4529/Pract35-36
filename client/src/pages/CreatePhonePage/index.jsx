import { Link } from "react-router-dom";
import PhoneForm from "../../components/PhoneForm";

function CreatePhonePage() {
  return (
    <div>
      <Link to='/' exact>Home</Link>
      <PhoneForm />
    </div>
  )
}

export default CreatePhonePage;