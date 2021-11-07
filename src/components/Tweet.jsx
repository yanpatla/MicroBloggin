import React, { useContext } from "react";
import styled from "@emotion/styled";
import AuthContext from "../context/auth/authContext";
const Li = styled.li`
  list-style: none;
  font-weight: 400;
  font-size: 1.4rem;

  color: #fff;
`;
const Tweet = ({ tweet }) => {
  // const authContext = useContext(AuthContext);
  // const { users, addUsers } = authContext;

  return (
    <Li>
      <div className="tweet">
        <div className="tweet_date">
          <span>{tweet.date}</span>
          <span>{tweet.userName || "User Name"}</span>
        </div>
        <div className=" tweet__messagge">
          <p>{tweet.content}</p>
        </div>
      </div>
    </Li>
  );
};

export default Tweet;
