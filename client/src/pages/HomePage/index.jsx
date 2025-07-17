import { Link } from "react-router-dom";

function HomePage () {
  return (
    <>
      <h1>Main Page</h1>
      <nav>
        <ul>
          <li>
            <Link to='/create'>Create phone</Link>
          </li>
          <li>
            <Link to='/phones'>Phones</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default HomePage;
