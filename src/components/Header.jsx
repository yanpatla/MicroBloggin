import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useHistory } from "react-router";
import { css } from "@emotion/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const ContainerHeader = styled.div`
  max-width: 107.6rem;
  width: 95%;
  margin: 0 auto;
`;
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
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #343a40;
  padding: 1.7rem;
  border-radius: 6px;

  a {
    font-style: normal;
    font-weight: normal;
    margin: 0 2rem 0 2rem;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    &:last-of-type {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;
const Header = () => {
    let history = useHistory();
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      history.push("/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainerHeader>
      <Nav>
        <div>
          <Link to={"/home"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
        </div>
        <div>
          <Button className="login-button" onClick={signOut}>
            Sign in With Google
          </Button>
        </div>
      </Nav>
    </ContainerHeader>
  );
};

export default Header;
