import classes from "./BlogDashboard.module.css";
import React from "react";
import NoData from "../../../assets/images/NoData.svg";

import { Typography } from "antd";
const { Title } = Typography;

const Card = ({ title }) => {
  return (
    <div className={classes.otherCards}>
      <div className={classes.otherCards__title}>
        <Title level={3} style={{ color: "#1b3a57" }}>
          {title}
        </Title>
      </div>
      <img
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
          marginTop: "125px",
        }}
        src={NoData}
        alt='Empty'
      />
    </div>
  );
};

export default Card;
