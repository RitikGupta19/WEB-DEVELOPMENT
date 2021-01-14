import React from "react";
import { Row, Col } from "antd";
import StatsCard from "./StatsCard";

const StatsCardList = () => {
  return (
    <Row gutter={[32, 24]}>
      <Col xs={22} sm={11} md={6} lg={6} xl={6} xxl={6}>
        <StatsCard
          title={"POSTS"}
          value={"2,315"}
          percent={"81.25%"}
          type={"positive"}
        />
      </Col>
      <Col xs={22} sm={11} md={6} lg={6} xl={6} xxl={6}>
        <StatsCard
          title={"PAGES"}
          value={"3,315"}
          percent={"28.25%"}
          type={"negative"}
        />
      </Col>
      <Col xs={22} sm={11} md={6} lg={6} xl={6} xxl={6}>
        <StatsCard
          title={"COMMENTS"}
          value={"2,995"}
          percent={"51.85%"}
          type={"positive"}
        />
      </Col>
      <Col xs={22} sm={11} md={6} lg={6} xl={6} xxl={6}>
        <StatsCard
          title={"SUBSCRIBERS"}
          value={"5,315"}
          percent={"25.25%"}
          type={"negative"}
        />
      </Col>
    </Row>
  );
};

export default StatsCardList;
