import React from "react";
import comingSoon from "../../assets/images/comingsoon.svg";

import { Typography } from "antd";

const { Title } = Typography;

const Tables = () => {
  return (
    <div>
      <Title level={5} style={{ color: "#1b3a57" }}>
        DASHBOARD
      </Title>
      <Title level={2} style={{ color: "#1b3a57", marginTop: "-0.1em" }}>
        Tables
      </Title>
      <img
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
        src={comingSoon}
        alt='Coming Soon'
      />
    </div>
  );
};

export default Tables;
