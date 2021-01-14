import React from "react";
import classes from "./BlogDashboard.module.css";
import { Line } from "react-chartjs-2";
import { cardOptions } from "./DataSets";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;

const StatsCard = ({ data }) => {
  return (
    <div className={classes.statsCard}>
      <div className={classes.statsCard__name}>
        <Title level={5} style={{ color: "#2e6191" }}>
          {data.datasets.label}
        </Title>
      </div>
      <div className={classes.statsCard__data}>
        <Title style={{ color: "#2e6191" }}>{data.value}</Title>
        {data.type === "positive" ? (
          <p style={{ color: "green" }}>
            <CaretUpOutlined style={{ color: "green" }} />
            {data.percent}
          </p>
        ) : (
          <p style={{ color: "red" }}>
            <CaretDownOutlined style={{ color: "red" }} />
            {data.percent}
          </p>
        )}
      </div>
      <Line height='175' width='100%' data={data} options={cardOptions} />
      <div></div>
    </div>
  );
};

export default StatsCard;
