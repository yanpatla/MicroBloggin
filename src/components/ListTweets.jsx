import React, { useContext,Fragment } from "react";
import TweetContext from "../context/tweet/tweetContext";
import styled from "@emotion/styled";
import Tweet from "./Tweet";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const ContainerList = styled.ul`
 
  background-color: #343a40;
  border-radius: 6px;
  padding: 1rem;
`;
const ListTweets = () => {
  const tweetsContext = useContext(TweetContext);
  const { tweets } = tweetsContext;
  const dbTweets  = firebase.firestore();
  return (
    <Fragment>
      {tweets.map((tweet) => (
        <ContainerList key={tweet.tweetID}>
          <Tweet tweet={tweet} />
        </ContainerList>
      ))}
    </Fragment>
  );
};

export default ListTweets;
