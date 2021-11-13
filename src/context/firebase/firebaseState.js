import { useState } from "react";
import firebase, { FirebaseContext } from "./index";

const MyAppState = (props) => {
  const [search, setSearch] = useState("");
  return (
    <FirebaseContext.Provider value={{ firebase, search, setSearch }}>
      {" "}
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default MyAppState;
