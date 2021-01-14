import React from "react";
import classes from "./BlogDashboard.module.css";
import { Typography } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const { Title } = Typography;

const StatsCard = ({ title, value, percent, type }) => {
  return (
    <div className={classes.statsCard}>
      <div className={classes.statsCard__name}>
        <Title level={5} style={{ color: "#2e6191" }}>
          {title}
        </Title>
      </div>
      <div className={classes.statsCard__data}>
        <Title style={{ color: "#2e6191" }}>{value}</Title>
        {type === "positive" ? (
          <p style={{ color: "green" }}>
            <CaretUpOutlined style={{ color: "green" }} />
            {percent}
          </p>
        ) : (
          <p style={{ color: "red" }}>
            <CaretDownOutlined style={{ color: "red" }} />
            {percent}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
