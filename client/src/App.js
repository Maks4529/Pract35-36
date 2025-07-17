import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePhonePage from "./pages/CreatePhonePage";
import PhoneListPage from "./pages/PhoneListPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/create">
            <CreatePhonePage />
          </Route>
          <Route path="/phones">
            <PhoneListPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
