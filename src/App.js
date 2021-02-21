import Signup from "./Signup";
import Example from "./Navbar";
// import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login";
import NewsFeed from "./components/Newsfeed";
import { useEffect, useState } from "react";
import { fire } from "./firebase";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setLoggedIn(!loggedIn);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Example />
      <Switch>
        {/* <Route exact path="/">
          <Signup />
        </Route> */}
        <Route exact path="/">
          {loggedIn ? <Redirect to="/newsfeed" /> : <Signup />}
        </Route>
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <Route path="/login">
          {loggedIn ? <Redirect to="/newsfeed" /> : <Login />}
        </Route>
        <Route path="/newsfeed">
          <NewsFeed />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
