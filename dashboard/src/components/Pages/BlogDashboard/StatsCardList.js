import React from "react";
import StatsCard from "./StatsCard";
import { cardDataSets } from "./DataSets";
import { Row, Col } from "antd";

const StatsCardList = () => {
  return (
    <Row gutter={[32, 24]}>
      {cardDataSets.map((cardDataSet, index) => (
        <Col xs={22} sm={11} md={6} lg={6} xl={6} xxl={6}>
          <StatsCard key={index} data={cardDataSet} />
        </Col>
      ))}
    </Row>
  );
};

export default StatsCardList;
