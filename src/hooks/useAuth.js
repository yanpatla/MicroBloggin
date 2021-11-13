import React, { useEffect, useState } from "react";
import firebase from "../context/firebase";

const useAuth = () => {
  const [authuser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsuscribe();
  }, []);
  return authuser;
};

export default useAuth;
