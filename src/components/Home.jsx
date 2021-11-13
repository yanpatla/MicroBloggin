import React, { useState, useContext, Fragment } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import styled from "@emotion/styled";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
 
import ListTweets from "./ListTweets";
import AuthContext from "../context/auth/authContext";
import { FirebaseContext } from "../context/firebase";
import { Link,useRouteMatch } from "react-router-dom";
const ContainerHome = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  width: 95%;
  margin: 0 auto;
  margin-top: 4rem;
`;
const ContainerForm = styled.div`
  position: relative;
`;
const ContainerTweet = styled.main`
  margin-top: 5rem;
`;
const TextAreaTweet = styled.textarea`
  width: 100%;
  border: 2px solid #cccccc;
  border-radius: 6px;
  background-color: #15202b;
  color: #fff;
`;
const InputTweetSubmit = styled.button`
  position: absolute;
  bottom: 1.8rem;
  right: 1.5rem;
  width: 6.8rem;
  height: 3.4rem;
  display: block;
  background: #007bff;
  border-radius: 4px;
  border: none;
  color: #fff;
  z-index: 1100;
`;
const CharsErrorContainer = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 2rem;
  display: inline-block;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;
const CharsErrorP = styled.p`
  font-size: 1.6rem;
  margin: 0;
  padding: 0.5rem;
`;

const Home = () => {
 
  const { currentuser } = useContext(AuthContext);
  const { firebase} = useContext(FirebaseContext);

  console.log(currentuser);

  

 

  const [tweets, setTweet] = useState({
    content: "",
  });

  const { content } = tweets;
  const handleChange = (e) => {
    setTweet({
      ...tweets,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.length > 141 || content.trim() === "") {
      
      return;
    }
    const contentTweets = {
      content,
      likes: 0,
      date: Date.now(),
      userCreator: {
        id: currentuser.uid,
        name: currentuser.displayName,
      },
      hasVoted: [],
    };
    firebase.db.collection("tweets").add(contentTweets);

    setTweet({
      content: "",
    });
  };

  return (
    <Fragment>
      <Header />

      <ContainerHome>
        <ContainerForm>
          <form onSubmit={handleSubmit}>
            <TextAreaTweet
              name="content"
              id="text-tweet"
              cols="30"
              rows="10"
              placeholder="What you have in mind..."
              value={content}
              onChange={handleChange}
            ></TextAreaTweet>
            {content.length > 141 ? (
              <>
                <CharsErrorContainer>
                  <CharsErrorP>The tweet can't </CharsErrorP>
                </CharsErrorContainer>
                <InputTweetSubmit type="submit" disabled>
                  Tweet
                </InputTweetSubmit>
              </>
            ) : (
              <InputTweetSubmit type="submit">Tweet</InputTweetSubmit>
            )}
          </form>
        </ContainerForm>
        <ContainerTweet>
         
     
  
          <ListTweets />
        </ContainerTweet>
      </ContainerHome>
    </Fragment>
  );
};

export default Home;
