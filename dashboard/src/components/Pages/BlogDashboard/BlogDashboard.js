import React from "react";
import StatsCardList from "./StatsCardList";
import StatsGraph from "./StatsGraph";
import StatsPieChart from "./StatsPieChart";
import CardList from "./CardList";
//ANTD imports
import { Typography, Row, Col } from "antd";

const { Title } = Typography;

const BlogDashboard = () => {
  return (
    <div>
      <Title level={5} style={{ color: "#1b3a57" }}>
        DASHBOARD
      </Title>
      <Title level={2} style={{ color: "#1b3a57", marginTop: "-0.1em" }}>
        Blog Overview
      </Title>

      {/* Statistics Card List */}
      <StatsCardList />

      {/* Graph and Pie Chart Component */}
      <Row gutter={[32, 24]}>
        <Col xs={24} sm={22} md={22} lg={16} xl={16} xxl={16}>
          <StatsGraph />
        </Col>
        <Col xs={24} sm={22} md={22} lg={8} xl={8} xxl={8}>
          <StatsPieChart />
        </Col>
      </Row>

      {/* Discussion / Other Card List */}
      <CardList />
    </div>
  );
};

export default BlogDashboard;
