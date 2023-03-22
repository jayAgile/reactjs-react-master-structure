import React from "react";
import { useDispatch } from "react-redux";
import { LOGIN_F } from "../../../constants";
import "./header.scss";
import { auth, provider } from "../../../firebase";
import { GoogleAuthProvider, deleteUser, signOut } from "firebase/auth";

const Header = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();

  const signOutGoogle = () => {
    const user = auth.currentUser;
    console.log(user.uid);
    const uid = user.uid;
    deleteUser(user)
      .then(() => {
        // User deleted.
        dispatch({ type: LOGIN_F });
        console.log("User Deleted");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });

    signOut(auth)
      .then(() => {
        console.log("success");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const onLogout = () => {
    dispatch({ type: LOGIN_F });
    signOutGoogle();
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Header</h2>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
