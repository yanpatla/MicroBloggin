import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import AuthState from "./context/auth/authState";
import MyAppState from "./context/firebase/firebaseState";

//* higher order component
import PrivateRoute from "./components/routes/privateRoute";
import UserProfile from "./components/UserProfile";
function App() {
  return (
    <div className="App">
      <MyAppState>
        <AuthState>
          <Router>
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
              <Route path="/userprofile/:profileID" component={UserProfile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={SignUp} />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </Router>
        </AuthState>
      </MyAppState>
      {/* NavBar */}
    </div>
  );
}

export default App;
