import {
  GET_TWEETS,
  POST_TWEETS,
  VALIDATE_FORM,
  HIDE_VALIDATE_FORM,
  TWEET_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case POST_TWEETS:
      return {
        ...state,
        tweets: [...state.tweets, action.payload],
      };
    case TWEET_ERROR:
      return {
        ...state,
        errorform: true,
      };

    case GET_TWEETS:
      return {
        ...state,
        tweets: action.payload,
      };

    default:
      return state;
  }
};
