import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "@emotion/styled";
import firebase from "../context/firebase";
import AuthContext from "../context/auth/authContext";
import { FirebaseContext } from "../context/firebase";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #cccccc;
  border-radius: 6px;
  background-color: #fff;
  color: #000;
`;

const Login = () => {
  let history = useHistory();


  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await firebase.login(email, password);
      history.push("/home");
    } catch (error) {
      console.log("Hubo un Error", error);
    }
  };
  
const signGoogle = async()=> {
  try {
    await firebase.loginGoogle();
    history.push("/home")
  } catch (error) {
    console.log(error);
  }
  
  }

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>LogIn</h2>
        <Form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <Input
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
             <Button>Login</Button>
        </Form>
             <Button onClick={signGoogle}>Login with Google</Button>
      </div>
    </div>
  );
};

export default Login;
