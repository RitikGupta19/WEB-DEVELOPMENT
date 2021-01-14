import React from "react";
import { pieChartOptions, pieChartDataSets } from "./DataSets";
import classes from "./BlogDashboard.module.css";
import { Typography } from "antd";
import { Doughnut } from "react-chartjs-2";
const { Title } = Typography;

const StatsPieChart = () => {
  return (
    <div className={classes.pieChartCard}>
      <div className={classes.pieChartCard__title}>
        <Title level={3} style={{ color: "#1b3a57" }}>
          User by Device
        </Title>
      </div>
      <div className={classes.pieChartCard__graph}>
        <Doughnut
          height='300'
          width='100%'
          data={pieChartDataSets}
          options={pieChartOptions}
        />
      </div>
      <div className={classes.pieChartCard__filters}>
        <button type='button' className={classes.buttons}>
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default StatsPieChart;
