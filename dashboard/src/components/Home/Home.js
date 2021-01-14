import React from "react";
import classes from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Content from "../Content/Content";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.homeBody}>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
        <div className={classes.mainContent}>
          <Header />
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Home;
