import React, { useReducer } from "react";
import TweetContext from "./tweetContext";
import tweetReducer from "./tweetReducer";
import { POST_TWEETS, TWEET_ERROR } from "../../types";
const TweetState = (props) => {
  const initialState = {
    tweets: [],
    errorform: false,
  };
  const [state, dispatch] = useReducer(tweetReducer, initialState);

  const addTweets = (tweet) => {
    dispatch({
      type: POST_TWEETS,
      payload: tweet,
    });
  };

  const validateForm = () => {
    dispatch({
      type: TWEET_ERROR,
    });
  };

  return (
    <TweetContext.Provider
      value={{
        //*States
        tweets: state.tweets,
        errorform: state.errorform,

        //*Functions
        addTweets,
        validateForm,
      }}
    >
      {props.children}
    </TweetContext.Provider>
  );
};

export default TweetState;
