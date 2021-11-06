import React from "react";
import styled from "@emotion/styled";

const Li = styled.li`
  list-style: none;
  font-weight: 400;
  font-size: 1.4rem;

  color: #fff;
`;
const Tweet = ({ tweet }) => {
  return (
    <Li>
      <div className="tweet">
        <div className="tweet_date">
          <span>{tweet.date}</span>
          <span>User</span>
        </div>
        <div className=" tweet__messagge">
          <p>{tweet.tweet}</p>
        </div>
      </div>
    </Li>
  );
};

export default Tweet;
