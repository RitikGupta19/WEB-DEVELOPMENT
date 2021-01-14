import React from "react";
import classes from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Content from "../Content/Content";

const Home = () => {
  return (
    <div className={classes.home}>
      <div>
        {/* Sidebar compoenent */}
        <Sidebar />
      </div>
      <div className={classes.home__mainContent}>
        {/* Header compoenent */}
        <Header />
        {/* Conten Shown Here */}
        <Content />
      </div>
    </div>
  );
};

export default Home;
