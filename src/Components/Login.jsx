import React, { useContext } from "react";
import "./Login.css";
import { Button, dialogActionsClasses } from "@mui/material";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  // function to make sign in
  const signIn = () => {
    // signin popup
    signInWithPopup(auth, provider)
      // to log user info
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      // for catching and displaying errors
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
          alt="Whatsapp Logo"
        ></img>
        <div className="login_text">
          <h1>Login to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>SignIn with Google</Button>
      </div>
    </div>
  );
};

export default Login;
