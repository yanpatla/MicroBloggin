import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "@emotion/styled";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import AuthContext from "../context/auth/authContext";

const Button = styled.button`
  background-color: #007bff;
  text-align: center;
  cursor: pointer;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  display: inline-block;
`;

firebase.initializeApp({
  apiKey: "AIzaSyDCxB-WSizuj0Ot-2c48vW-YRR791OS4n0",
  authDomain: "mini-blogging.firebaseapp.com",
  projectId: "mini-blogging",
  storageBucket: "mini-blogging.appspot.com",
  messagingSenderId: "505288361893",
  appId: "1:505288361893:web:84c9d0a6a71d7dad524a4c",
  measurementId: "G-100XQCCCFY",
});
const auth = firebase.auth();
const Login = () => {
  let history = useHistory();
  const authContext = useContext(AuthContext);
  const { users, addUsers } = authContext;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        addUsers(user);
      } else {
        addUsers(null);
      }

      //*Cleanup Subscription
      return unsubscribe;
    });
  }, []);
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>LogIn</h2>
        <Button className="login-button" onClick={signInWithGoogle}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
