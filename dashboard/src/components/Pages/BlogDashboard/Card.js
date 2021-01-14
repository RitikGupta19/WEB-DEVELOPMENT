import classes from "./BlogDashboard.module.css";
import React from "react";
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
    </div>
  );
};

export default Card;
