import React from "react";
import classes from "./BlogDashboard.module.css";
import { Typography } from "antd";
const { Title } = Typography;

const StatsPieChart = () => {
  return (
    <div className={classes.pieChartCard}>
      <div className={classes.pieChartCard__title}>
        <Title level={3} style={{ color: "#1b3a57" }}>
          User by Device
        </Title>
      </div>
    </div>
  );
};

export default StatsPieChart;
