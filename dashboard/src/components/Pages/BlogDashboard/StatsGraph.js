import React from "react";
import classes from "./BlogDashboard.module.css";
import { Typography } from "antd";

const { Title } = Typography;
const StatsGraph = () => {
  return (
    <div className={classes.graphCard}>
      <div className={classes.graphCard__title}>
        <Title level={3} style={{ color: "#1b3a57" }}>
          Users Overview
        </Title>
      </div>
      <div className={classes.graphCard__filters}></div>
      <div className={classes.graphCard__graph}></div>
    </div>
  );
};

export default StatsGraph;
