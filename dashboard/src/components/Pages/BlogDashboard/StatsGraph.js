import React from "react";
import { Line } from "react-chartjs-2";
import { graphDataSets, graphOptions } from "./DataSets";
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
      <div className={classes.graphCard__graph}>
        <Line
          height='300'
          width='100%'
          data={graphDataSets}
          options={graphOptions}
        />
      </div>
    </div>
  );
};

export default StatsGraph;
