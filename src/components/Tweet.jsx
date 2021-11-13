import React, { useContext, useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Swal from "sweetalert2";
import styled from "@emotion/styled";
import FormatDistanceNow from "date-fns/formatDistanceToNow";
import AuthContext from "../context/auth/authContext";
import { FirebaseContext } from "../context/firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const Li = styled.li`
  list-style: none;
  font-weight: 400;
  font-size: 1.4rem;
  color: #fff;
`;

const Tweet = ({ tweet }) => {
  let history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const { currentuser } = useContext(AuthContext);

  const likeTweet = () => {
    if (!currentuser) {
      Swal.fire({
        title: " To Like the Tweet Please LogIn ",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          return history.push("/login");
        }
      });
    }

    //* Get and count likes
    const totalLikes = tweet.likes + 1;

    //*Verify if the current user has voted
    if (tweet.hasVoted.includes(currentuser.uid)) {
      return;
    }
    const newHasVoted = [...tweet.hasVoted, currentuser.uid];
    //*Update DB
    firebase.db
      .collection("tweets")
      .doc(tweet.id)
      .update({ likes: totalLikes, hasVoted: newHasVoted });
    //*Update State

    tweet.likes = totalLikes;
  };

  const unLike = () => {
    if (!currentuser) {
      Swal.fire({
        title: " To Like the Tweet Please LogIn ",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          return history.push("/login");
        }
      });
    }
    //* Get and count likes
    const totalLikes = tweet.likes - 1;
    const newHasVoted = tweet.hasVoted.filter((el) => el !== currentuser.uid);
    // //*Update DB
    firebase.db
      .collection("tweets")
      .doc(tweet.id)
      .update({ likes: totalLikes, hasVoted: newHasVoted });
    // //*Update State

    tweet.likes = totalLikes;
  };
  console.log(tweet);

  return (
    <Li>
      <div className="tweet">
        <div className="tweet_date">
          <span>{FormatDistanceNow(new Date(tweet.date))}</span>
          <Link to={`/userprofile/${tweet.id}`}>
            <div className="userTweet">{tweet.userCreator.name}</div>
          </Link>
        </div>
        <div className=" tweet__messagge">
          <div>
            <p>{tweet.content}</p>
          </div>
          <div className="likes">
            {currentuser &&
              (tweet.hasVoted.includes(currentuser.uid) ? (
                <AiFillHeart onClick={unLike} />
              ) : (
                <AiOutlineHeart onClick={likeTweet} />
              ))}
            <p>{tweet.likes}</p>
          </div>
        </div>
      </div>
    </Li>
  );
};

export default Tweet;
