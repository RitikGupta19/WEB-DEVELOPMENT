import classes from "./Content.module.css";
import React from "react";
import { Switch } from "react-router-dom";
import Routes from "../../Routes";

const Content = () => {
  return (
    <div className={classes.mainBody}>
      <Switch>
        <Routes />
      </Switch>
    </div>
  );
};

export default Content;
