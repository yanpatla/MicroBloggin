import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

import Login from "./components/Login";
import AuthState from "./context/auth/authState";
import TweetState from "./context/tweet/tweetState";

function App() {
  return (
    <div className="App">
      <TweetState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </AuthState>
      </TweetState>
      {/* NavBar */}
    </div>
  );
}

export default App;
