import React, { useContext, Fragment, useEffect } from "react";
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
  const { tweets, getTweets } = tweetsContext;
  useEffect(() => {
    getTweets();
  }, []);
  return (
    <Fragment>
      {tweets.map((tweet) => (
        <ContainerList key={tweet.tweetID || tweet.id}>
          <Tweet tweet={tweet} />
        </ContainerList>
      ))}
    </Fragment>
  );
};

export default ListTweets;
