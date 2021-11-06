import React, { useState, useContext, Fragment } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import styled from "@emotion/styled";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import TweetContext from "../context/tweet/tweetContext";
import ListTweets from "./ListTweets";
import AuthContext from "../context/auth/authContext";
const ContainerHome = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  width: 95%;
  margin: 0 auto;
  margin-top: 4rem;
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
  width: 6.8rem;
  height: 3.4rem;
  display: block;
  background: #007bff;
  border-radius: 4px;
  position: absolute;
  border: none;
  color: #fff;
`;

const Home = () => {
  const authContext = useContext(AuthContext);
  const { users, addUsers } = authContext;
  const tweetsContext = useContext(TweetContext);

  const { addTweets, errorform, validateForm } = tweetsContext;

  const [tweets, setTweet] = useState({
    tweet: "",
  });

  const { tweet } = tweets;
  const handleChange = (e) => {
    setTweet({
      ...tweets,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tweet.length > 141 || tweet.trim() === "") {
      validateForm();
      return;
    }
    tweets.date = moment().format("MMM Do YY");
    tweets.tweetID = uuidv4();
    addTweets(tweets);

    setTweet({
      tweet: "",
    });
  };
 
  return (
    <Fragment>
      <Header />

      <ContainerHome>
        <form onSubmit={handleSubmit}>
          <TextAreaTweet
            name="tweet"
            id="text-tweet"
            cols="30"
            rows="10"
            placeholder="What you have in mind..."
            value={tweet}
            onChange={handleChange}
          ></TextAreaTweet>
          {tweet.length > 141 ? (
            <p>The max char are 140</p>
          ) : (
            <InputTweetSubmit type="submit" disabled>
              Tweet
            </InputTweetSubmit>
          )}
          <InputTweetSubmit type="submit">Tweet</InputTweetSubmit>
        </form>

        <ContainerTweet>
          <ListTweets />
        </ContainerTweet>
      </ContainerHome>
    </Fragment>
  );
};

export default Home;
