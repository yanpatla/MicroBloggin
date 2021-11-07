import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

import Login from "./components/Login";
import Profile from "./components/Profile";
import AuthState from "./context/auth/authState";
import TweetState from "./context/tweet/tweetState";

function App() {
  return (
    <div className="App">
      <AuthState>
        <TweetState>
 
          <Router>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/" component={Login} />
              <Route exact path="/profile" component={Profile}/>
            </Switch>
          </Router>
        </TweetState>
      </AuthState>
      {/* NavBar */}
    </div>
  );
}

export default App;
