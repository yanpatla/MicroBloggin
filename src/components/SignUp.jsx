import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import FileUploader from "react-firebase-file-uploader";
import styled from "@emotion/styled";
import firebase from "../context/firebase";
import AuthContext from "../context/auth/authContext";

const Button = styled.button`
  background-color: #007bff;
  text-align: center;
  cursor: pointer;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  display: inline-block;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #cccccc;
  border-radius: 6px;
  background-color: #fff;
  color: #000;
`;

const SignUp = () => {
  let history = useHistory();

  //* State Image
  const [imgname, setImgName] = useState("");
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlimg, setUrlImg] = useState("");

  const authContext = useContext(AuthContext);
  const { users, addUsers } = authContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    prfileImage: "",
    password: "",
  });
  const { name, email, password, prfileImage } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //*validation
    try {
      await firebase.register(name, email, password, prfileImage);
     

      setUser({
        name: "",
        email: "",
        password: "",
        prfileImage: "",
      });
      history.push("/home");
    } catch (error) {
      console.error("Error to create the User", error);
    }
  };

  const signGoogle = async () => {
    try {
      await firebase.loginGoogle();
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadStart = () => {
    setProgress(0);
    setUpload(true);
  };
  const handleProgress = (progr) => setProgress({ progr });

  const handleUploadError = (error) => {
    setUpload(error);
    console.error(error);
  };

  const handleUploadSuccess=name=>{
    setProgress(100);
    setUpload(false);
    setImgName(name)
    firebase.storage.child(name).getDownloadURL().then(url=>console.log(url))
  }

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>SignUp</h2>
        <Form onSubmit={handleSubmit}>
          <label>User</label>
          <Input type="text" value={name} name="name" onChange={handleChange} />
          <label>E-mail</label>
          <Input
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          {/* <label>Profile Image</label>
          <FileUploader
            accept="image/*"
            name="prfileImage"
            value={prfileImage}
            onChange={handleChange}
            randomizeFilename
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          /> */}
          <label>Password</label>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <Button className="login-button">SignUp</Button>
        </Form>
        <Button onClick={signGoogle}>SignUp with Google</Button>
      </div>
    </div>
  );
};

export default SignUp;
