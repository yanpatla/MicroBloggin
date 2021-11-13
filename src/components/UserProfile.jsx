import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import AuthContext from "../context/auth/authContext";
import { FirebaseContext } from "../context/firebase";
import { useParams } from "react-router-dom";
import Error404 from "./error/404";
const ContainerTweet = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  width: 95%;
  margin: 0 auto;
  margin-top: 3.5rem;
`;
const InputUser = styled.input`
  width: 100%;
  border: 2px solid #cccccc;
  border-radius: 6px;
  background-color: #15202b;
  padding: 2rem;
  color: #fff;
`;
const InputSave = styled.button`
  width: 6.8rem;
  height: 3.4rem;
  margin-top: 1rem;
  display: block;
  background: #007bff;
  border-radius: 4px;
  position: absolute;
  border: none;
  color: #fff;
`;
const TitleProfile = styled.h1`
  color: #fff;
  font-size: 3.2rem;
  font-weight: 400;
  margin: 0;
`;
const Subtitle = styled.h3`
  color: #ffffffcc;
  font-size: 1.8rem;
  font-weight: 400;
`;

const UserProfile = () => {
  const [userprofile, setUserProfile] = useState("");
  const [error, setError] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const { currentuser } = useContext(AuthContext);
  let { profileID } = useParams();

  useEffect(() => {
    if (profileID) {
      const getUserProfile = async () => {
        const userProfileQuery = await firebase.db
          .collection("tweets")
          .doc(profileID);
        const userProfile = await userProfileQuery.get();

        if (userProfile.exists) {
          setUserProfile(userProfile.data());
        } else {
          setError(true);
        }
        // setUserProfile(userProfile.data());
      };
      getUserProfile();
    }
  }, [profileID]);
  const { userCreator } = userprofile;
 
  if (error) return <Error404 />;
  return (
    <>
      <Header />
      <ContainerTweet>
        <div className="title_profile">
          <TitleProfile>Profile</TitleProfile>
        </div>

        <div className="user_name">
          <Subtitle>User Name</Subtitle>
          {userCreator && <InputUser type="text" value={userCreator.name} />}
          <InputSave>Save</InputSave>
        </div>
      </ContainerTweet>
    </>
  );
};

export default UserProfile;
