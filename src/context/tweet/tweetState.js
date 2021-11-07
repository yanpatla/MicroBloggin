import React, { useReducer } from "react";
import TweetContext from "./tweetContext";
import tweetReducer from "./tweetReducer";
import { POST_TWEETS, TWEET_ERROR, GET_TWEETS } from "../../types";
import clienteAxios from "../../config/axios";
const TweetState = (props) => {
  const initialState = {
    tweets: [],
    errorform: false,
  };
  const [state, dispatch] = useReducer(tweetReducer, initialState);

  const addTweets = async (tweet) => {
    try {
 
      dispatch({
        type: POST_TWEETS,
        payload: tweet,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    dispatch({
      type: TWEET_ERROR,
    });
  };

  const getTweets = async () => {
    try {
      const results = await clienteAxios.get("/tweet");

      dispatch({
        type: GET_TWEETS,
        payload: results.data.tweets,
      });
    } catch (error) {}
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
        getTweets,
      }}
    >
      {props.children}
    </TweetContext.Provider>
  );
};

export default TweetState;
