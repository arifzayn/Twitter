import Signup from "./Signup";
import Example from "./Navbar";
// import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import NewsFeed from "./components/Newsfeed";

function App() {
  return (
    <BrowserRouter>
      <Example />
      <Switch>
        <Route exact path="/">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/newsfeed">
          <NewsFeed />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
