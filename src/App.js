import Signup from "./Signup";
import Example from "./Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import NewsFeed from "./components/Newsfeed";
// import { useEffect, useState } from "react";
// import { fire } from "./firebase";
import Profile from "./components/Profile";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   var user = fire.auth().currentUser;

  //   if (user) {
  //     // User is signed in.
  //     setLoggedIn(!loggedIn);
  //   } else {
  //     // No user is signed in.
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Example />
      <Switch>
        <Route exact path="/">
          {/* {loggedIn ? <Redirect to="/newsfeed" /> : <Signup />} */}
          <Signup />
        </Route>

        <Route path="/login">
          {/* {loggedIn ? <Redirect to="/newsfeed" /> : <Login />} */}
          <Login />
        </Route>

        <Route path="/newsfeed">
          <NewsFeed />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
