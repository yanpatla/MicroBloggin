import { ADD_USER } from "../../types";
import React, { useReducer } from "react";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = (props) => {
  const initialState = {
    users: [],
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const addUsers = (user) => {
    dispatch({
      type: ADD_USER,
      payload: user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        users: state.users,

        addUsers,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState