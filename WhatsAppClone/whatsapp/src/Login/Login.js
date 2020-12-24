import React from "react";
import { Button } from "@material-ui/core";
import classes from "./Login.module.css";
import WhatsAppLogo from "../Images/WhatsAppLogo1.png";
import { auth, provider } from "../Firebase/firebase";
import { actionTypes } from "../Context/Reducer";
import { useStateValue } from "../Context/StateProvider";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        <img src={WhatsAppLogo} alt='whats app' />
        <div className={classes.login__text}>
          <h1>Sign To WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign with Google</Button>
      </div>
    </div>
  );
};

export default Login;
