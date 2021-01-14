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
      <div className={classes.graphCard__filters}>
        <div className={classes.graphCard__dateButtons}>
          <button type='button' className={classes.buttons}>
            Start Date
          </button>
          <button type='button' className={classes.buttons}>
            End Date
          </button>
        </div>
        <button type='button' className={classes.buttons}>
          View Full Report
        </button>
      </div>
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
