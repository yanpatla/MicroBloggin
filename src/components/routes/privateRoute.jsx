import React, { useContext, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { currentuser } = useContext(AuthContext);
  console.log(currentuser);
  return (
    <Route
      {...props}
      render={(props) =>
        currentuser ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
