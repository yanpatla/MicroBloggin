import React, { useReducer } from "react";

import AuthContext from "./authContext";

import useAuth from "../../hooks/useAuth";

const AuthState = (props) => {
  const currentuser = useAuth();
  console.log(currentuser);

  return (
    <AuthContext.Provider
      value={{
        currentuser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
