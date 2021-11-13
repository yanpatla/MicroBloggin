import React, { useContext, Fragment, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";

 
import styled from "@emotion/styled";
import Tweet from "./Tweet";
import AuthContext from "../context/auth/authContext";

const ContainerList = styled.ul`
  background-color: #343a40;
  border-radius: 6px;
  padding: 1rem;
`;

const RedirectLink = styled.button`
  display: inline-block;
  background: #007bff;
  border-radius: 4px;
  padding: 1rem;
  border: none;
  color: #fff;
  :hover {
    cursor: pointer;
  }
`;
const ListTweets = () => {
  // const tweetsContext = useContext(TweetContext);
  // const { tweets, getTweets } = tweetsContext;

  const [tweets, setTweets] = useState([]);
  const [owntweet, setOwnTweet] = useState(false);
  const { firebase, search, setSearch } = useContext(FirebaseContext);
  const { currentuser } = useContext(AuthContext);
  console.log(currentuser.uid);
  console.log(tweets);
  useEffect(() => {
    const getTweets = async () => {
      await firebase.db
        .collection("tweets")
        .orderBy("date", "desc")
        .onSnapshot(handleSnapshots);
    };
    getTweets();
  }, []);

  const handleSnapshots = (snapshot) => {
    const tweets = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setTweets(tweets);
  };

  return (
    <Fragment>
      {owntweet ? (
        <RedirectLink onClick={() => setOwnTweet(false)}>
          Show all Tweets
        </RedirectLink>
      ) : (
        <RedirectLink onClick={() => setOwnTweet(true)}>
          Show my Tweets
        </RedirectLink>
      )}

      {owntweet
        ? tweets
            .filter((pepe) => pepe.userCreator.id === currentuser.uid)
            .map((tweet) => (
              <ContainerList key={tweet.id}>
                <Tweet tweet={tweet} />
              </ContainerList>
            ))
        : tweets
            .filter((el) => {
              if (search.trim() === "") {
                return el;
              } else if (
                el.content.toLowerCase().includes(search.toLowerCase())
              ) {
                return el;
              }
            })

            .map((tweet) => (
              <ContainerList key={tweet.id}>
                <Tweet tweet={tweet} />
              </ContainerList>
            ))}
    </Fragment>
  );
};

export default ListTweets;
